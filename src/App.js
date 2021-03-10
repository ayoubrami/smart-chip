import './App.css';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imagelinkform';
import FaceRecognition from './components/facerecognition/facerecognition';
import Rank from './components/Rank/rank';
import SignIn from './components/signin/signin';
import Register from './components/register/register';
import Particles from 'react-particles-js';
import { useState } from 'react'
import { Switch,Route,Redirect } from 'react-router-dom'

const particlesOptions={
  "particles": {
    "number": {
        "value": 150
    },
    "size": {
        "value": 5
    }
},
  "interactivity": {
     "events": {
        "onhover": {
            "enable": true,
            "mode": "repulse"
        }
      }
  }
}
 
function App() {
  
  const [input, setInput]=useState('');
  const [box, setBox]=useState('');
  const [isSignedIn, setIsSignedIn]=useState(false);
  const initialState = {
    id:'',
    name:'',
    email:'',
    entries:0,
    joined:''

}
  const [user, setUser]=useState(initialState);

  const signOut = () => {
    setInput('')
    setBox('')
    setIsSignedIn(false)
    setUser(initialState)
  }

  const loadUser= (user)=>{
    setUser({
      id:user.id,
      name:user.name,
      email:user.email,
      entries:user.entries,
      joined:user.joined
    });
  }

  const calculateLocation = (data) =>{
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image =document.getElementById('image');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol : face.left_col * width,
      topRow : face.top_row * height,
      rightCol : width - (face.right_col * width),
      bottomRow : height - (face.bottom_row * height)
    }
  }

  const faceBox = (box) =>{
    setBox(box);
  }

  const onInputChange = (event) =>{
    setInput(event.target.value)
  }

  const onSubmit =()=>{
    fetch('https://smart-chip-api.herokuapp.com/requestapi',{
      method : 'post',
      headers : {'Content-Type':'application/json'},
      body : JSON.stringify({
        input
      })
    })
    .then(response=>response.json())
    .then(response=>{
      if(response){
        fetch('https://smart-chip-api.herokuapp.com/image',{
          method : 'put',
          headers : {'Content-Type':'application/json'},
          body:JSON.stringify({
            id: user.id
          })
        })
        .then(response=>response.json())
        .then(count=>{setUser({...user,entries:count})})
        .catch(console.log)
      }
      faceBox(calculateLocation(response))
    })
    .catch(console.log);
  }

  return (
    <div className="App">
      <Particles className='particles' params={particlesOptions} />
      <Navigation isSignedIn={isSignedIn} signOut={signOut} />
      <Switch>
        <Route  exact path='/' 
                render={ ()=> isSignedIn ? ( 
                  <>
                    <Logo/>
                    <Rank entries={user.entries} name={user.name}/>
                    <ImageLinkForm 
                      onInputChange={onInputChange}
                      onSubmit={onSubmit}
                    />
                    <FaceRecognition input={input} box={box}/>
                  </>
                  )
                  :(<SignIn loadUser={loadUser} setIsSignedIn={setIsSignedIn} />)}
        />
        <Route path='/signin' render = {()=> isSignedIn ? (<Redirect to='/'/>) : (<SignIn loadUser={loadUser} setIsSignedIn={setIsSignedIn}/>) }/>
        <Route path='/register' render={()=> isSignedIn ? (<Redirect to='/'/>) : (<Register loadUser={loadUser} setIsSignedIn={setIsSignedIn} />)}/>
      </Switch>
    </div>
  );
}

export default App;
