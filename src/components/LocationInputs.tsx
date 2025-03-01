import { useEffect, useRef, useState } from "react";
import CustomInput from "./ui/CustomInput";
import { CardBody, Divider } from "@heroui/react";
import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";
import { ILocationProps } from "../types";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../css/location.css";

interface LocationInputsProps {
  onChangeValue: (location: ILocationProps) => void;
  data: ILocationProps;
}

const LocationInputs = ({ onChangeValue, data }: LocationInputsProps) => {
  const myAPIKey = "03c625d7d60347ef9d650e23be28760f";
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const autocompleteRef = useRef<HTMLDivElement | null>(null);
  const [location, setLocation] = useState<ILocationProps>();

  useEffect(() => {
    console.log("Loca: ", data);
    setLocation(data);
  }, [data]);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", { zoomControl: false }).setView(
        [38.9088, -77.0234],
        12
      );

      const isRetina = L.Browser.retina;
      const baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${myAPIKey}`;
      const retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${myAPIKey}`;

      L.tileLayer(isRetina ? retinaUrl : baseUrl, {
        attribution:
          'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a>',
        maxZoom: 20,
      }).addTo(mapRef.current);

      L.control
        .zoom({
          position: "bottomright",
        })
        .addTo(mapRef.current);
    }

    // Initialize Geocoder Autocomplete only once
    if (autocompleteRef.current && !autocompleteRef.current.hasChildNodes()) {
      const autocompleteInput = new GeocoderAutocomplete(
        autocompleteRef.current,
        myAPIKey,
        {}
      );

      // Create a marker icon
      const markerIcon = L.icon({
        iconUrl: `https://api.geoapify.com/v1/icon/?type=awesome&color=%232ea2ff&size=large&scaleFactor=2&apiKey=${myAPIKey}`,
        iconSize: [38, 56],
        iconAnchor: [19, 51],
        popupAnchor: [0, -60],
      });

      // Handle location selection
      autocompleteInput.on("select", (location) => {
        if (!mapRef.current) return;

        // Remove previous marker
        if (markerRef.current) {
          markerRef.current.remove();
        }

        if (location) {
          const { lat, lon, formatted, country, city, state, postcode } =
            location.properties;

          markerRef.current = L.marker([lat, lon], { icon: markerIcon }).addTo(
            mapRef.current
          );
          mapRef.current.panTo([lat, lon]);

          markerRef.current = L.marker(
            [location.properties.lat, location.properties.lon],
            {
              icon: markerIcon,
            }
          ).addTo(mapRef.current);

          mapRef.current.panTo([
            location.properties.lat,
            location.properties.lon,
          ]);

          const placeIdUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${myAPIKey}`;

          fetch(placeIdUrl)
            .then((response) => response.json())
            .then((data) => {
              if (data.features && data.features.length > 0) {
                const placeId = data.features[0].properties.place_id;
                onChangeValue({
                  address: formatted || "",
                  country: country || "",
                  city: city || "",
                  state: state || "",
                  pinCode: postcode || "",
                  latitude: lat,
                  longitude: lon,
                  googleMapsPlaceId: placeId,
                });
                setLocation({
                  address: formatted || "",
                  country: country || "",
                  city: city || "",
                  state: state || "",
                  pinCode: postcode || "",
                  latitude: lat,
                  longitude: lon,
                  googleMapsPlaceId: placeId,
                });
              }
            })
            .catch((error) => console.error("Error fetching place ID:", error));
        }
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  //   console.log("Location: ", location);

  return (
    <>
      <CardBody className="gap-6">
        <Divider className="-my-2" />
        <label className="text-sm -mb-4" htmlFor="location">
          Address <span className="text-red-400">*</span>
        </label>
        <div>
          <div
            ref={autocompleteRef}
            defaultValue={location?.address}
            className="relative geoapify-autocomplete-input"
          ></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <CustomInput
            label="Country"
            isRequired={true}
            type="text"
            placeholder="Enter country"
            value={location?.country}
          />
          <CustomInput
            label="City"
            isRequired={true}
            type="text"
            placeholder="Enter city"
            value={location?.city}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <CustomInput
            label="State"
            isRequired={true}
            type="text"
            placeholder="Enter state"
            value={location?.state}
          />
          <CustomInput
            label="pinCode"
            isRequired={true}
            type="text"
            placeholder="Enter pinCode"
            value={location?.pinCode}
          />
        </div>

        <CustomInput
          label="Google Maps Place ID"
          isRequired={true}
          type="text"
          placeholder="Enter maps place id"
          value={location?.googleMapsPlaceId}
        />

        <div className="grid lg:grid-cols-2 gap-6">
          <CustomInput
            label="Latitude"
            type="number"
            isRequired={true}
            placeholder="Enter latitude"
            value={location?.coordinates?.latitude}
          />
          <CustomInput
            label="Longitude"
            type="number"
            isRequired={true}
            placeholder="Enter longitude"
            value={location?.coordinates?.longitude}
          />
        </div>

        {/* Map Container */}
        <div
          id="map"
          style={{
            height: "400px",
            width: "100%",
            border: "2px solid #ccc",
            zIndex: 0,
          }}
        ></div>
      </CardBody>
    </>
  );
};

export default LocationInputs;
