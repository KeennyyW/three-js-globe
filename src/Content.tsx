import "./Content.css"
import {useState} from "react";






const MyComponent = () => {
    const [isHoveredBox1, setHoveredBox1] = useState(false);
    const [isHoveredBox2, setHoveredBox2] = useState(false);
    const [isHoveredBox3, setHoveredBox3] = useState(false);
    const [isHoveredBox4, setHoveredBox4] = useState(false);

    return (
        <div className="Content">
            <div className="main-content">
                <div className="fact-box"
                     onMouseEnter={() => setHoveredBox1(true)}
                     onMouseLeave={() => setHoveredBox1(false)}>
                    <p>Der Datenverkehr trägt 33% zu den globalen CO2 Emissionen bei</p>
                    {isHoveredBox1 && (
                        <div>
                            <img src="/files/Screenshot 2024-10-21 111032.png" alt="" className="first-image"/>
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
                                <img src="/files/img.png" alt="" className="first-image"/>
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className="fact-box"
                     onMouseEnter={() => setHoveredBox3(true)}
                     onMouseLeave={() => setHoveredBox3(false)}>
                    <p>Alle Rechenzentren verbrauchen etwa 416 Terrawattstunden im Jahr. Ganz Österreich verbraucht
                        vergleichsweise 12 Terrawattstunden im Jahr. </p>
                    <div>
                        {isHoveredBox3 ? (
                            <div>
                                <img src="/files/image2.png" alt="" className="first-image"/>
                            </div>
                        ) : null}
                    </div>


                </div>
                <div className="fact-box">
                    <p>Alle Rechenzentren verbrauchen ungefähr 26,5km² </p>
                </div>
                <div className="fact-box"
                     onMouseEnter={() => setHoveredBox4(true)}
                     onMouseLeave={() => setHoveredBox4(false)}>
                  <p>Es gibt rund 8000 Rechenzentren auf der Welt. Davon befinden sich 5000 in den USA</p>
                    {isHoveredBox4 ? (
                        <div>
                            <img src="/files/Screenshot%202024-10-22%20091224.png" alt="" className="first-image"/>
                        </div>
                    ) : null}
              </div>



          </div>



      </div>

  );
}





export default MyComponent;