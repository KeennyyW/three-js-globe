import "./Content.css"

const MyComponent = () => {
  return (
      <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', transition: 'transform 0.5s' }}>
        <div className="container">
          <div className="content">
            <h1>Global Reach</h1>
            <p>As of 2023, over 5.3 billion people worldwide use the internet, which is approximately 66% of the global
              population.</p>

            <h1>Growth Over Time</h1>
            <p>Internet users have grown from just 413 million in 2000 to 5.3 billion in 2023, representing an increase
              of over 1,200% in just two decades.</p>

            <h1>Mobile Dominance</h1>
            <p>About 91% of internet users access the web via mobile devices, highlighting the shift toward mobile
              internet usage.</p>

            <h1>Social Media Usage</h1>
            <p>Over 4.9 billion people are active social media users, which is more than 60% of the global population.
              The average user spends around 2.5 hours per day on social media platforms.</p>

            <h1>Digital Divide</h1>
            <p>While internet usage is widespread, disparities exist. Regions such as Africa have lower internet
              penetration rates (around 40%) compared to North America (over 90%).</p>

            <h1>Language Diversity</h1>
            <p>Over 7,000 languages are spoken globally, but more than 55% of content on the internet is in English.
              This highlights the need for greater linguistic diversity online.</p>
          </div>
        </div>
      </div>
  );
}

export default MyComponent;