import "./Content.css"
import {useState} from "react";






const MyComponent = () => {
    const [hidden, setHidden] = useState(true)


  return (
      <div className="Content">
          <div className="main-content">
              <div className="fact-box"
              onMouseEnter={() => setHidden(false)}
              onMouseLeave={() => setHidden(true)}>
                  <p>Der Datenverkehr trägt 33% zu den globalen CO2 Emissionen bei</p>
                  <div>
                      {hidden ? null : <h1>Hover</h1>}
                  </div>

              </div>
              <div className="fact-box">
                  <p>Der Speicher von Google betrug 1 Exabyte im Jahre 2010, heutzutage beträgt alleine der jährliche Zuwachs des Speichers 6.2 Exabyte.</p>
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