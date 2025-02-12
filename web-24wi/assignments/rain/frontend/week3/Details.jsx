import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import { useState, useContext } from "react";
import Modal from "./Modal";
import AdoptedPetContext from "./AdoptedPetContext";

const Details = () => {
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [, setAdoptedPet] = useContext(AdoptedPetContext);


  if(results.isLoading) {
    return(
        <div className="loading-pane">
            <h2 className="loader">🌀</h2>
        </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="absolute bottom-0 left-0 bg-gradient-to-tr from-white to-transparent pr-2 pt-2">
        <Carousel images={pet.images} />;
       
        <div>
            
            <h1>{pet.name}</h1>
            <h2>{`${pet.animal} - ${pet.breed} - ${pet.city}, ${pet.state}`}</h2>
            <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
            <p>{pet.description}</p>
            {
              showModal ? (
                <Modal>
                  <div>
                    <h1>Would you like to adopt{pet.name}?</h1>
                    <div className="buttons">
                      <button onClick={() =>{
                          fetch(`http://sub.arcology.builders:5000/adopt-pet/${pet.name}`, {"method":"POST"});
                          setAdoptedPet(pet);
                          navigate("/");
                        }}
                      >
                        Yes
                      </button>
                      <button onClick={() => setShowModal(false)}>No</button>
                    </div>
                  </div>
                </Modal>
              ) : null
            }
        </div>
  </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}