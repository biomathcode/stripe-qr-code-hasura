
import GoogleLogin from 'react-google-login';
import './App.css';
import QrCode from './Qrcode';


function App() {
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
        <GoogleLogin style={{backgroundColor: 'var(--gray1)', color: 'var(--gray10)'}}/>
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
