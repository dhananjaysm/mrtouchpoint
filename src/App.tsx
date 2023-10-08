import { useState } from "react";
import "./App.css";
import ImageUploader from "./components/ImageUploader";
import ImageViewer from "./components/ImageViewer";
import { TouchPoint } from "./types";

function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [touchpoints, setTouchpoints] = useState<Record<string, TouchPoint>>(
    {}
  );
  const [showJSON, setShowJSON] = useState<boolean>(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageSrc(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;

    const key = `Touchpoint_${Object.keys(touchpoints).length + 1}`;

    setTouchpoints((prev) => ({
      ...prev,
      [key]: { left: offsetX, top: offsetY },
    }));
  };

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: "30px" }}>
          <ImageUploader onImageChange={handleImageChange} />
          <ImageViewer
            imageSrc={imageSrc}
            onImageClick={handleImageClick}
            touchpoints={touchpoints}
          />
        </div>
        <button onClick={() => setShowJSON(!showJSON)}>
          {showJSON ? " Table View" : "JSON View"}
        </button>
        <div style={{ padding: "20px", maxWidth: "80%", margin: "0 auto" }}>
          {showJSON ? (
            <div>
              <h3>Generated Touchpoints:</h3>
              <pre>{JSON.stringify(touchpoints, null, 2)}</pre>
            </div>
          ) : (
            <div>
              <h3>Touchpoints Table:</h3>
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Left Coordinate</th>
                    <th>Top Coordinate</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(touchpoints).map(([key, point], _) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{point.left}</td>
                      <td>{point.top}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
