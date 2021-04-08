import { useState } from 'react';
import Modal from 'react-modal';
import { useFetch } from '../../../hooks/useFetch';

const CreateAd = ({ openModal, setOpenModal}) => {
  const { post} = useFetch(true);

  const [nameModif, setName] = useState("");
  const [priceModif, setPrice] = useState("");
  const [descriptionModif, setDescription] = useState("");

  const handleRequestCloseFunc = () => {
    setOpenModal(false);
  }

  const handleOnChange = (e) => {
    console.log(e.target);
		switch (e.target.id) {
			case "name" : 
				setName(e.target.value);
				break;
			case "price" : 
				setPrice(e.target.value);
				break;
			case "description" : 
				setDescription(e.target.value);
				break;
      case "images" :
        console.log(e.target.value);
        break;
			default : break;
		}
  }

  const handleSubmit = () => {
    const createAd = {
			ad: {
				name: nameModif,
				price: priceModif,
				description: descriptionModif,
			}
		};
		post(`ads`, createAd);
  }
  return (
    <>
      <Modal
        isOpen={openModal}
        ariaHideApp={false}
        contentLabel="Card Annonce"
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        onRequestClose={handleRequestCloseFunc}
        style={{
          overlay: {
            padding: "0",
            margin: "0",
            backgroundColor: "#424040b0",
          },
          content: {
            color: "black",
            marginTop: "80px",
            height: "80vh",
            width: "60vw",
            marginLeft: "18vw"
          }
        }}
      >
        <section>
          <form onChange={handleOnChange} onSubmit={handleSubmit}>
            <input type="text" id={"name"} value={nameModif}/>
            <input type="number" id={"price"} value={priceModif}/>
            <input type="text" id={"description"} value={descriptionModif}/>
            <input 
              id="images"
              type="file"
              multiple="true"
              accept="image/*"
            />
            <button type="submit">Créer</button>
          </form>
        </section>
      </Modal>
    </>
  ) 
}

export default CreateAd;