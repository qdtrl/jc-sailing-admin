import { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import CreateAd from './Create';
import UpdateAd from './Update';


const Ads = () => {
  const { responseData:ads, get} = useFetch();
  const [ad, setAd] = useState();
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);


  useEffect(() => {
    if (!ads) {
      get(`/ads`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ads]);
  
  useEffect(() => {
    if (ad) {
      setOpenModalUpdate(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ad])

  const handleModifAd = (event) => {
    console.log('oui monsieur modifiez moi :', event.target.id)
    if (ads) {
      setAd(ads[Number(event.target.id)]);
    }
  }
  const handleCreateAd = () => {
    console.log('oui monsieur creez moi ');
    setOpenModalCreate(true);
  }

  const handleDeleteAd = (event) => {
    console.log('oui monsieur supprimez moi :', event.target.id )
  }
  return ( 
    <>
      <p>les annonces</p>
      <CreateAd
        openModal={openModalCreate}
        setOpenModal={setOpenModalCreate}
      />
      <button onClick={handleCreateAd}>Nouvelle annonce</button>
      {ad && 
        <UpdateAd
          ad={ad}
          setAd={setAd}
          openModal={openModalUpdate}
          setOpenModal={setOpenModalUpdate}
        />
      }
      {ads && 
        ads.map(({ad, images}, index) => (
          <div key={ad.id} id={index}>
            <h2>{ad.name}</h2>
            <p>{ad.description}</p>
            <p>{ad.created_at}</p>
            {images.map((image_url, index)=> (
                <img src={image_url} alt={ad.name} key={index}/>
            ))}
            <button onClick={handleModifAd} id={index}>Modifier</button>
            <button onClick={handleDeleteAd} id={ad.id}>Supprimer l'annonce</button>
          </div>
        ))
      }
      { !ads && <p>Chargement...</p>}
    </>
  )
}
export default Ads;