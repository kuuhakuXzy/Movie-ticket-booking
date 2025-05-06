import { Film } from "lucide-react";
import './App.css';

function App() {
  return (
    <>
      <div className="min-h-screen bg-jet-black flex items-center justify-center">
        <div className="grid min-h-screen lg:grid-cols-2 w-full">
          <div className="flex flex-col gap-4 p-2 md:p-4">
            <div className="flex justify-center gap-2 md:justify-start">
              <a href="#" className="flex items-center gap-2 font-medium">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground text-white">
                  <Film className="size-20" />
                </div>
                <div className="text-white text-2xl font-semibold font-sanss">CineBook</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
