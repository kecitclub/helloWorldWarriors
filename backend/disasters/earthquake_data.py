import os
import django
import requests
from datetime import datetime
from django.core.management.base import BaseCommand
from disasters.models import Disaster, DisasterType  


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "your_project.settings")
django.setup()


class Command(BaseCommand):
    help = "Fetch earthquake data and populate the database"

    def handle(self, *args, **kwargs):
        url = "https://earthquake.usgs.gov/fdsnws/event/1/query"
        params = {
            "format": "geojson",
            "starttime": datetime.now().strftime('%Y-%m-%dT%H:%M:%S'),
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
                latitude, longitude = geometry["coordinates"][1], geometry["coordinates"][0]

                # Check if the earthquake is already in the database
                if not Disaster.objects.filter(
                    latitude=latitude, longitude=longitude, date_occurred=properties["time"]
                ).exists():
                    Disaster.objects.create(
                        disaster_type=DisasterType.EARTHQUAKE,  # Replace with your enum value for earthquake
                        date_occurred=datetime.fromtimestamp(properties["time"] / 1000),
                        latitude=latitude,
                        longitude=longitude,
                        magnitude=properties["mag"],
                        is_active=True,
                    )
                    new_entries += 1

            self.stdout.write(self.style.SUCCESS(f"{new_entries} new earthquake(s) added."))
        else:
            self.stderr.write(f"Failed to fetch data: {response.status_code}")
