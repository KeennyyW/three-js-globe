import "./Content.css"
import {useState} from "react";

import App from './App'




const MyComponent = () => {
    const [isHoveredBox1, setHoveredBox1] = useState(false);
    const [isHoveredBox2, setHoveredBox2] = useState(false);

    return (
        <div className="Content">
            <div className="main-content">
                <div className="fact-box"
                     onMouseEnter={() => setHoveredBox1(true)}
                     onMouseLeave={() => setHoveredBox1(false)}>
                    <p>Der Datenverkehr trägt 33% zu den globalen CO2 Emissionen bei</p>
                    {isHoveredBox1 && (
                        <div>
                            <img src="src/files/Screenshot 2024-10-21 111032.png" alt="" className="first-image"/>
                        </div>
                    )}
                </div>
                
                {/* Pass the hover state to the App component */}
                
                

                <div className="fact-box"
                     onMouseEnter={() => setHoveredBox2(true)}
                     onMouseLeave={() => setHoveredBox2(false)}>
                    <p>Der Speicher von Google betrug 1 Exabyte im Jahre 2010, heutzutage beträgt alleine der jährliche
                        Zuwachs des Speichers 6.2 Exabyte.</p>
                    <div>
                        {isHoveredBox2 ? (
                            <div>
                                <img src="src/files/image2.png" alt="" className="first-image"/>
                            </div>
                        ) : null}
                    </div>
                </div>

              <div className="fact-box">
                  <p>Alle 8000 Rechenzentren verbrauchen etwa 416 Terrawattstunden im Jahr. Ganz Österreich verbraucht vergleichsweise 12 Terrawattstunden im Jahr. </p>
              </div>
              <div className="fact-box">
                  <p>Alle Rechenzentren verbrauchen ungefähr 26,5km² </p>
              </div>
              <div className="fact-box">
                  Hello World! Hello World! Hello World! Hello World!
              </div>
              <div className="fact-box">
                  Hello World! Hello World! Hello World! Hello World!
              </div>

              <div className="fact-box">
                  Hello World! Hello World! Hello World! Hello World!
              </div>

              <div className="fact-box">
                  Hello World! Hello World! Hello World! Hello World!
              </div>

              <div className="fact-box">
                  Hello World! Hello World! Hello World! Hello World!
              </div>

              <div className="fact-box">
                  Hello World! Hello World! Hello World! Hello World!
              </div>



          </div>



      </div>

  );
}





export default MyComponent;