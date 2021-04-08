import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Ads from '../Ads/';


const JC = () => {
  const user:any = useSelector((state) => state);
  const history = useHistory();

  useEffect(() => {
		if (!user.isLogged) {
			history.push(`/`);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])
  return (
    <>
      <Ads/> 

    </>
  )
}

export default JC;