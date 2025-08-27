import { useLoadScript, Autocomplete, GoogleMap } from "@react-google-maps/api";
import { useRef, useState } from "react";

const MapSearch = ({setJobDetails,type}) => {
    //console.log(googleMapData,".................")
    const autocompleteRef = useRef(null);
    const [searchValue,setSearchValue]=useState("");
    const { isLoaded, loadError } = useLoadScript({
        // googleMapsApiKey: "AIzaSyDGSlhaWmPcOQXsi-Wqe4l5JZj4_tJ41lA",
        // googleMapsApiKey:"AIzaSyAtc1qnhk3GcaqTFm2MO4H-dsBSyjyVcl8",
        googleMapsApiKey:"AIzaSyDqtaMGsIB-4GbnBjdpfzNTlEBXviBd3zM",
        libraries: ["places"],
    });

    const onPlaceChanged = () => {
        const place = autocompleteRef.current.getPlace();

        if (!place.geometry || !place.address_components) {
            alert("No details available for input: '" + place.name + "'");
            return;
        }

        const lat = place?.geometry?.location.lat();
        const lng = place?.geometry?.location.lng();

        let postalCode = "";
        let city = "";
        let state = "";

        place.address_components.forEach((component) => {
            const types = component.types;

            if (types.includes("postal_code")) {
                postalCode = component.long_name;
            }

            if (
                types.includes("locality") ||
                types.includes("postal_town") ||
                types.includes("administrative_area_level_2")
            ) {
                city = component.long_name;
            }

            if (types.includes("administrative_area_level_1")) {
                state = component.long_name;
            }
        });

       if(type==="job"){
         setJobDetails((pre) => ({
            ...pre,
            city: city,
            state: state,
            jobAddress: place?.formatted_address,
            latitude: lat,
            longitude: lng,
        }));
       }
       else if(type==="course"){
         setJobDetails((pre) => ({
            ...pre,
            townCity: city,
            address: place?.formatted_address,
            latitude: lat,
            longitude: lng,
        }));
       }
        else if(type==="employerProfile"){
            //debugger
         setJobDetails((pre) => ({
            ...pre,
            townCity: city,
            address: place?.formatted_address,
            latitude: lat,
            longitude: lng,
            state:state
        }));
       }
        else if(type==="employeeProfile"){
            //debugger
         setJobDetails((pre) => ({
            ...pre,
            town: city,
            city:city,
            address: place?.formatted_address,
            latitude: lat,
            longitude: lng,
            state:state
        }));
       }
        setSearchValue(place?.formatted_address)
    };

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <Autocomplete
            onLoad={(ref) => (autocompleteRef.current = ref)}
            onPlaceChanged={onPlaceChanged}
            options={{
                componentRestrictions: { country: "uk" },
                types: ["address"],
            }}
        >
            <input
                onChange={(e)=>{
                    setSearchValue(e.target.value)
                }}
                value={searchValue}
                type="text"
                required
                name="jobAddress"
                placeholder="Enter location"
                className="w-full border border-gray-300 rounded-lg p-3"
            />
        </Autocomplete>
    );
};

export default MapSearch
