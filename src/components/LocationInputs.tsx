import { useEffect, useRef, useState } from "react";
import CustomInput from "./ui/CustomInput";
import { CardBody, Divider } from "@heroui/react";
import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../css/location.css";

interface LocationInputsProps {
  onChangeValue: (location: ILocationProps) => void;
  data?: ILocationProps;
  errors?: any;
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

const LocationInputs = ({
  onChangeValue,
  data,
  errors,
}: LocationInputsProps) => {
  const myAPIKey = "03c625d7d60347ef9d650e23be28760f";
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const autocompleteRef = useRef<HTMLDivElement | null>(null);
  const [address, setAddress] = useState("");
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
    setLocation(
      data || {
        address: "",
        country: "",
        city: "",
        state: "",
        pinCode: "",
        latitude: "",
        longitude: "",
        googleMapsPlaceId: "",
      }
    );

    setAddress(data?.address || "");
  }, [data]);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", { zoomControl: false }).setView(
        [38.9088, -77.0234], // Default location
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

    // ✅ Update marker when prefilled data is available
    if (data?.coordinates?.latitude && data?.coordinates?.longitude) {
      const lat = parseFloat(data.coordinates?.latitude);
      const lon = parseFloat(data.coordinates?.longitude);

      if (!isNaN(lat) && !isNaN(lon)) {
        mapRef.current.setView([lat, lon], 15); // Move the map to the new location

        // Remove previous marker if exists
        if (markerRef.current) {
          markerRef.current.remove();
        }

        // Add a new marker
        markerRef.current = L.marker([lat, lon]).addTo(mapRef.current);
      }
    }

    // console.log("Location Data 002: ", data); // Check the entire `data` object
    // const address = data?.address || "";
    // console.log("Address from data: ", address);

    // Initialize Geocoder Autocomplete only once
    if (autocompleteRef.current && !autocompleteRef.current.hasChildNodes()) {
      const autocompleteInput = new GeocoderAutocomplete(
        autocompleteRef.current,
        myAPIKey,
        {}
      );

      autocompleteInput.setValue(address);
      console.log("------------------------------------------");
      console.log("Address ", address);

      autocompleteInput.on("select", (location) => {
        if (!mapRef.current) return;

        const { lat, lon, formatted, country, city, state, postcode } =
          location.properties;

        // Remove previous marker if exists
        if (markerRef.current) {
          markerRef.current.remove();
        }

        // Set new marker
        markerRef.current = L.marker([lat, lon]).addTo(mapRef.current);
        mapRef.current.panTo([lat, lon]);

        // Get place ID via reverse geocoding
        const placeIdUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${myAPIKey}`;
        fetch(placeIdUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data.features && data.features.length > 0) {
              const placeId = data.features[0].properties.place_id;
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
            }
          })
          .catch((error) => console.error("Error fetching place ID:", error));
      });

      // console.log("Autocomplete Input: ", autocompleteInput);
      // console.log("Autocomplete address: ", address);

      autocompleteInput.on("input", (e: any) => {
        console.log("Typing Address Value: ", e);

        if (e !== undefined) {
          setLocation((prevState) => ({
            ...prevState,
            address: e,
          }));
        } else {
          console.error("Input event target is undefined");
        }
      });
      autocompleteInput.setValue(address);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [data]);

  useEffect(() => {
    onChangeValue(location);
  }, [location]);

  // console.log("Location Inputs: ", location);
  // console.log("Address21022: ", address);

  return (
    <>
      <CardBody className="gap-6">
        <Divider className="-my-2" />
        <label className="text-sm -mb-4" htmlFor="location">
          Address <span className="text-red-400">*</span>
        </label>
        <div>
          <div>
            <div
              ref={autocompleteRef}
              // defaultValue={location?.address}
              className="relative geoapify-autocomplete-input"
            ></div>
            <span className="text-gray-400 text-xs -mt-5">
              Please Select Address
            </span>
          </div>
          {errors?.address && (
            <span className="text-error mt-5">{errors?.address}</span>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div>
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
            {errors?.country && (
              <span className="text-error -mt-5">{errors?.country}</span>
            )}
          </div>

          <div>
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
            {errors?.city && (
              <small className="text-error -mt-5">{errors?.city}</small>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div>
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
            {errors?.state && (
              <small className="text-error -mt-5">{errors?.state}</small>
            )}
          </div>
          <div>
            <CustomInput
              label="PinCode"
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
            {errors?.pinCode && (
              <small className="text-error -mt-5">{errors?.pinCode}</small>
            )}
          </div>
        </div>

        <div>
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
          {errors?.googleMapsPlaceId && (
            <small className="text-error -mt-5">
              {errors?.googleMapsPlaceId}
            </small>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <CustomInput
              label="Latitude"
              type="number"
              isRequired={false}
              placeholder="Enter latitude"
              name={location?.latitude}
              value={location?.latitude}
              onValueChange={(e) => {
                setLocation({
                  ...location,
                  latitude: e,
                });
              }}
            />
            {errors?.latitude && (
              <small className="text-error -mt-5">{errors?.latitude}</small>
            )}
          </div>
          <div>
            <CustomInput
              label="Longitude"
              type="number"
              isRequired={false}
              placeholder="Enter longitude"
              name={location?.longitude}
              value={location?.longitude}
              onValueChange={(e) => {
                setLocation({
                  ...location,
                  longitude: e,
                });
              }}
            />
            {errors?.longitude && (
              <small className="text-error -mt-5">{errors?.longitude}</small>
            )}
          </div>
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

// import { useEffect, useRef, useState } from "react";
// import { CardBody, Divider } from "@heroui/react";
// import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";
// import "@geoapify/geocoder-autocomplete/styles/minimal.css";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "../css/location.css";

// interface LocationInputsProps {
//   onChangeValue: (location: ILocationProps) => void;
//   data?: ILocationProps;
//   errors?: any;
// }

// export interface ILocationProps {
//   address: string;
//   country: string;
//   city: string;
//   state: string;
//   pinCode: string;
//   latitude: string;
//   longitude: string;
//   googleMapsPlaceId: string;
// }

// const LocationInputs = ({
//   onChangeValue,
//   data,
//   errors,
// }: LocationInputsProps) => {
//   const myAPIKey = "03c625d7d60347ef9d650e23be28760f";
//   const mapRef = useRef<L.Map | null>(null);
//   const markerRef = useRef<L.Marker | null>(null);
//   const autocompleteRef = useRef<HTMLDivElement | null>(null);

//   const [location, setLocation] = useState<ILocationProps>({
//     address: "",
//     country: "",
//     city: "",
//     state: "",
//     pinCode: "",
//     latitude: "",
//     longitude: "",
//     googleMapsPlaceId: "",
//   });

//   // Update location state when 'data' changes
//   useEffect(() => {
//     if (data) {
//       setLocation(data);
//     }
//   }, [data]);

//   // Map and Marker initialization
//   useEffect(() => {
//     if (!mapRef.current) {
//       mapRef.current = L.map("map", { zoomControl: false }).setView(
//         [38.9088, -77.0234], // Default location
//         12
//       );

//       const isRetina = L.Browser.retina;
//       const baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${myAPIKey}`;
//       const retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${myAPIKey}`;

//       L.tileLayer(isRetina ? retinaUrl : baseUrl, {
//         attribution:
//           'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a>',
//         maxZoom: 20,
//       }).addTo(mapRef.current);

//       L.control
//         .zoom({
//           position: "bottomright",
//         })
//         .addTo(mapRef.current);
//     }

//     // Update marker when data changes
//     if (data?.latitude && data?.longitude) {
//       const lat = parseFloat(data.latitude);
//       const lon = parseFloat(data.longitude);

//       if (!isNaN(lat) && !isNaN(lon)) {
//         mapRef.current.setView([lat, lon], 15);

//         if (markerRef.current) {
//           markerRef.current.remove();
//         }

//         markerRef.current = L.marker([lat, lon]).addTo(mapRef.current);
//       }
//     }

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, [data]);

//   // Geocoder Autocomplete setup and handling
//   useEffect(() => {
//     if (autocompleteRef.current) {
//       const autocompleteInput = new GeocoderAutocomplete(
//         autocompleteRef.current,
//         myAPIKey,
//         {}
//       );

//       // Set the address value if available
//       const address = data?.address || "";
//       autocompleteInput.setValue(address);

//       console.log("Address: ", address); // Verify address

//       // Handle address selection from autocomplete
//       autocompleteInput.on("select", (location) => {
//         const { lat, lon, formatted, country, city, state, postcode } =
//           location.properties;

//         // Set location data based on selected address
//         const newLocation: ILocationProps = {
//           address: formatted || "",
//           country: country || "",
//           city: city || "",
//           state: state || "",
//           pinCode: postcode || "",
//           latitude: lat,
//           longitude: lon,
//           googleMapsPlaceId: location.properties.place_id,
//         };

//         setLocation(newLocation);
//         onChangeValue(newLocation); // Pass the updated location back to the parent
//       });

//       // Handle address input changes
//       autocompleteInput.on("input", (e: any) => {
//         if (e) {
//           setLocation((prevState) => ({
//             ...prevState,
//             address: e,
//           }));
//         } else {
//           console.error("Input event target is undefined");
//         }
//       });

//       return () => {
//         // Cleanup
//         if (autocompleteRef.current) {
//           autocompleteRef.current.innerHTML = ""; // Remove previous results
//         }
//       };
//     }
//   }, [data]); // Re-run whenever 'data' changes

//   return (
//     <>
//       <CardBody className="gap-6">
//         <Divider className="-my-2" />
//         <label className="text-sm -mb-4" htmlFor="location">
//           Address <span className="text-red-400">*</span>
//         </label>
//         <div>
//           <div>
//             <div
//               ref={autocompleteRef}
//               className="relative geoapify-autocomplete-input"
//             ></div>
//             <span className="text-gray-400 text-xs -mt-5">
//               Please Select Address
//             </span>
//           </div>
//           {errors?.address && (
//             <span className="text-error mt-5">{errors?.address}</span>
//           )}
//         </div>
//         <div id="map" style={{ height: "400px" }}></div>
//       </CardBody>
//     </>
//   );
// };

// export default LocationInputs;
