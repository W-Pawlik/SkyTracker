import os
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import FlightSerializer
from requests.auth import HTTPBasicAuth

def fetch_flights_data(url):
    try:
        username = os.getenv("OPENSKY_API_USERNAME")
        password = os.getenv("OPENSKY_API_PASSWORD")
        
        response = requests.get(url, auth=HTTPBasicAuth(username, password))
        response.raise_for_status()
        data = response.json()

        states = data.get("states", None)
        if not states:
            return {"error": "No flight data available for the given parameters", "details": "No 'states' field in the response"}

        serialized_flights = [
            FlightSerializer({
                "icao24": flight[0],
                "callsign": flight[1].strip(),
                "origin_country": flight[2],
                "time_position": flight[3],
                "last_contact": flight[4],
                "longitude": flight[5],
                "latitude": flight[6],
                "baro_altitude": flight[7],
                "on_ground": flight[8],
                "velocity": flight[9],
                "true_track": flight[10],
                "vertical_rate": flight[11],
                "sensors": flight[12],
                "geo_altitude": flight[13],
                "squawk": flight[14],
                "spi": flight[15],
                "position_source": flight[16]
            }).data for flight in data.get("states", [])
        ]
        return {"time": data["time"], "states": serialized_flights}

    except requests.RequestException as e:
        return {"error": "Failed to fetch data from OpenSky API", "details": str(e)}



class FlightDataView(APIView):
    def get(self,request):
        opensky_url = os.getenv("OPENSKY_API_URL")

        result = fetch_flights_data(opensky_url)

        if "error" in result:
            return Response(result,status=status.HTTP_503_SERVICE_UNAVAILABLE)
        return Response(result, status=status.HTTP_200_OK)

class FlightDataInAreaView(APIView):
    def get(self, request):

        lamin = request.query_params.get('lamin')
        lamax = request.query_params.get('lamax')
        lomin = request.query_params.get('lomin')
        lomax = request.query_params.get('lomax')

        if not all([lamin, lamax,lomin,lomax]):
            return Response({"error": "Missing required bounding box parameters"}, status=status.HTTP_400_BAD_REQUEST)

        opensky_url = (
            f"{os.getenv('OPENSKY_API_URL')}?"
            f"lamin={lamin}&lamax={lamax}&lomin={lomin}&lomax={lomax}"
        )

        result = fetch_flights_data(opensky_url)

        if "error" in result:
            return Response(result, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        
        return Response(result,status=status.HTTP_200_OK)

class FlightDataByIcao24View(APIView):
    
    def get(self,request, icao24):
        opensky_url = os.getenv("OPENSKY_API_URL")
        result = fetch_flights_data(opensky_url)

        if "error" in result:
            return Response(result, status=status.HTTP_503_SERVICE_UNAVAILABLE)
            
        airplane_data = next((flight for flight in result["states"] if flight["icao24"] == icao24), None)

        if airplane_data is None:
            return Response({"error": f"No data found for airplane with ICAO24: {icao24}"})
            
        return Response(airplane_data, status=status.HTTP_200_OK)