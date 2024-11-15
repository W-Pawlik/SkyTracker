from django.urls import path
from .views import FlightDataByIcao24View, FlightDataView, FlightDataInAreaView

urlpatterns = [
    path('allflights/', FlightDataView.as_view(), name='allflights'),
    path('flights-in-area/', FlightDataInAreaView.as_view(), name="flights-in-area"),
    path('airplane/<str:icao24>', FlightDataByIcao24View.as_view(), name="flight_data_by_icao24")
]