import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  },
);

const Canvas = () => {
  return (
    <div className="h-full w-full">
      <Excalidraw />
    </div>
  );
};

export default Canvas;
