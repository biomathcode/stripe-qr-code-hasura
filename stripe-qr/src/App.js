
import GoogleLogin from 'react-google-login';
import './App.css';
import QrCode from './components/Qrcode';


function App() {

  const responseGoogle = (response) => {
    console.log(response);
  }
  return (
    <div className=" ">
      <main className='App flex center'>
      <div className='box flex center'>
        <h1>
        <span >
          🥷
          </span> <br/>
          Introducing 
        
            <br/>
          <span>
          Stripe QR
          </span>
       
        </h1>
      </div>
      </main>
      <section className='features flex center column'>
      <div className='card'>
        <h2>
        Features!
        </h2>
       </div>
       <div className='card'>
        <h3>
        <GoogleLogin 
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        onSuccess={responseGoogle}
        isSignedIn={true}
        
        style={{backgroundColor: 'var(--gray1)', color: 'var(--gray10)'}}/>
        </h3>

         </div>
         <div className='card'>
 

          <QrCode text={"https://coolhead.in/lkfdsmfkaldsmfldsmfdsfkmfsdkfdm"} />
           


         </div>
     

      </section>

    </div>
  );
}

export default App;
