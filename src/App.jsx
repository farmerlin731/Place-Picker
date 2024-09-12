import { useEffect, useRef, useState } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

const storedIDs = JSON.parse(localStorage.getItem("pickedPlaces")) || [];
const storePlaces = storedIDs.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id == id)
);

function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storePlaces);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        pos.coords.latitude,
        pos.coords.longitude
      );

      setAvailablePlaces(sortedPlaces);

      //Oh,, the following u don't need to put in 'useEffect'.
      //Cuz u can get response instantly.
      // const storedIDs = JSON.parse(localStorage.getItem("pickedPlaces")) || [];
      // console.log(storedIDs);
      // setPickedPlaces(
      //   storedIDs.map((id) => AVAILABLE_PLACES.find((place) => place.id == id))
      // );
    });
  }, []);

  function handleStartRemovePlace(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storedIDs = JSON.parse(localStorage.getItem("pickedPlaces")) || [];
    console.log(storedIDs);

    if (storedIDs.indexOf(id) === -1) {
      localStorage.setItem("pickedPlaces", JSON.stringify([id, ...storedIDs]));
    }
  }

  function handleRemovePlace() {
    let filterArr = [];
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    //Oh,, setState is async function, u can't do that.
    //localStorage.setItem("pickedPlaces", JSON.stringify(filterArr));

    const storedIDs = JSON.parse(localStorage.getItem("pickedPlaces")) || [];
    const tmpIDs = storedIDs.filter((id) => id != selectedPlace.current);
    localStorage.setItem("pickedPlaces", JSON.stringify(tmpIDs));
    modal.current.close();
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Please wait for the sorting data..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
