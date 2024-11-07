from django.urls import path
from .views import FlightDataView, FlightDataInAreaView

urlpatterns = [
    path('allflights/', FlightDataView.as_view(), name='flights'),
    path('flights-in-area/', FlightDataInAreaView.as_view(), name="flights-in-area")
]