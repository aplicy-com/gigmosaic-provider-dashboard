import { useEffect, useRef, useState } from "react";
import CustomInput from "./ui/CustomInput";
import { CardBody, Divider } from "@heroui/react";
import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";
// import { ILocationProps } from "../types";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../css/location.css";

interface LocationInputsProps {
  onChangeValue: (location: ILocationProps) => void;
  data?: ILocationProps;
}

export interface ILocationProps {
  address: string;
  country: string;
  city: string;
  state: string;
  pinCode: string;
  latitude: string;
  longitude: string;
  googleMapsPlaceId: string;
}

const LocationInputs = ({ onChangeValue, data }: LocationInputsProps) => {
  const myAPIKey = "03c625d7d60347ef9d650e23be28760f";
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const autocompleteRef = useRef<HTMLDivElement | null>(null);
  const [location, setLocation] = useState<ILocationProps>({
    address: "",
    country: "",
    city: "",
    state: "",
    pinCode: "",
    latitude: "",
    longitude: "",
    googleMapsPlaceId: "",
  });

  useEffect(() => {
    console.log("Loca: ", data);
    setLocation(data);
  }, [data]);

  // useEffect(() => {
  //   console.log("Loca: ", data);
  //   onChangeValue(location);
  // }, [location]);

  console.log("Value: location: ", location);

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
            name={location?.country}
            value={location?.country}
            onValueChange={(e) => {
              setLocation({
                ...location,
                country: e,
              });
            }}
          />
          <CustomInput
            label="City"
            isRequired={true}
            type="text"
            placeholder="Enter city"
            name={location?.city}
            value={location?.city}
            onValueChange={(e) => {
              setLocation({
                ...location,
                city: e,
              });
            }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <CustomInput
            label="State"
            isRequired={true}
            type="text"
            placeholder="Enter state"
            name={location?.state}
            value={location?.state}
            onValueChange={(e) => {
              setLocation({
                ...location,
                state: e,
              });
            }}
          />
          <CustomInput
            label="pinCode"
            isRequired={true}
            type="text"
            placeholder="Enter pinCode"
            name={location?.pinCode}
            value={location?.pinCode}
            onValueChange={(e) => {
              setLocation({
                ...location,
                pinCode: e,
              });
            }}
          />
        </div>

        <CustomInput
          label="Google Maps Place ID"
          isRequired={false}
          type="text"
          placeholder="Enter maps place id"
          name={location?.googleMapsPlaceId}
          value={location?.googleMapsPlaceId}
          onValueChange={(e) => {
            setLocation({
              ...location,
              googleMapsPlaceId: e,
            });
          }}
        />

        <div className="grid lg:grid-cols-2 gap-6">
          <CustomInput
            label="Latitude"
            type="number"
            isRequired={false}
            placeholder="Enter latitude"
            name={location?.latitude}
            value={location?.coordinates?.latitude}
            onValueChange={(e) => {
              setLocation({
                ...location,
                latitude: e,
              });
            }}
          />
          <CustomInput
            label="Longitude"
            type="number"
            isRequired={false}
            placeholder="Enter longitude"
            name={location?.longitude}
            value={location?.coordinates?.longitude}
            onValueChange={(e) => {
              setLocation({
                ...location,
                longitude: e,
              });
            }}
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
