import { useState } from 'react';
import Modal from 'react-modal';
import { useFetch } from '../../../hooks/useFetch';

const UpdateAd = ({ ad, setAd, openModal, setOpenModal}) => {
  const { patch} = useFetch(true);
  const { id, name, price, description } = ad.ad;

  const [nameModif, setName] = useState(name);
  const [priceModif, setPrice] = useState(price);
  const [descriptionModif, setDescription] = useState(description);

  const handleRequestCloseFunc = () => {
    setOpenModal(false);
    setAd("");
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
    const updateAd = {
			ad: {
				name: nameModif,
				price: priceModif,
				description: descriptionModif,
			}
		};
		patch(`ads/${id}`, updateAd);
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
            <button type="submit">Modifier</button>
          </form>
        </section>
      </Modal>
    </>
  ) 
}

export default UpdateAd;