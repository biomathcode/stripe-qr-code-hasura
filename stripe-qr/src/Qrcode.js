import QRcode from 'qrcode';
import { useEffect, useState } from 'react';


const QrCode = ({text}) => {
    const [src, setSrc] = useState('');

    useEffect(() => {
        QRcode.toDataURL(text).then((data) => {
            setSrc(data);
        })
    }, [src, text])

    return (
        <div>
            <img src={src} alt="QRcode"  style={{borderRadius: '10px'}}/>
        </div>
    )


}


export default QrCode;