import React , {useState , useEffect} from 'react'
import { Container , Postform } from '../components'
import { useParams , useNavigate } from "react-router-dom";
import authServices from '../appwriter/conf';

const EditPost = () => {

    const [post , setpost] = useState();
    const {slug} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if(slug){
            authServices.getPost(slug).then((post) => {
                setpost(post)
            })
        }else{
            navigate("/")
        }
     },[slug,navigate])


  return post ? (
    <div className='py-8'>
      <Container >
        <Postform post={post} />
      </Container>
    </div>
  ) : null
}

export default EditPost
