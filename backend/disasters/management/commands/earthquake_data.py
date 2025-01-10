import os
import django
import requests
from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from disasters.models import Disaster, DisasterType  

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

today = datetime.now()
limit = today - timedelta(days=5)

class Command(BaseCommand):
    help = "Fetch earthquake data and populate the database"

    def handle(self, *args, **kwargs):
        url = "https://earthquake.usgs.gov/fdsnws/event/1/query"
        params = {
            "format": "geojson",
            "starttime": limit.strftime('%Y-%m-%d'), 
            "endtime": today.strftime('%Y-%m-%d'),
            "minlatitude": 26.347,
            "maxlatitude": 30.422,
            "minlongitude": 80.058,
            "maxlongitude": 88.201,
            "minmagnitude": 3.0,
        }

        response = requests.get(url, params=params)

        if response.status_code == 200:
            data = response.json()
            new_entries = 0

            for feature in data["features"]:
                properties = feature["properties"]
                geometry = feature["geometry"]

                time_unix = properties["time"]
                date_occurred = datetime.fromtimestamp(time_unix / 1000)

                coordinates = geometry["coordinates"]
                longitude, latitude = coordinates[0], coordinates[1]

                if not Disaster.objects.filter(
                    latitude=latitude, longitude=longitude, date_occurred=date_occurred
                ).exists():
                    Disaster.objects.create(
                        disaster_type=DisasterType.EARTHQUAKE,  
                        date_occurred=date_occurred,
                        latitude=latitude,
                        longitude=longitude,
                        magnitude=properties.get("mag"),
                        is_active=True,
                    )
                    new_entries += 1

            self.stdout.write(self.style.SUCCESS(f"{new_entries} new earthquake(s) added."))
        else:
            self.stderr.write(f"Failed to fetch data: {response.status_code}")