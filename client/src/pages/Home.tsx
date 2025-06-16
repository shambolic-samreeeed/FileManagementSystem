import DisplayAllFiles from "../components/Files/DisplayAllFiles"
import NavigationCards from "../components/Home/NavigationCards"
import NavBar from "../components/NavBar/NavBar"

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      
      <div className="flex flex-col md:flex-row gap-4 p-4 md:h-[calc(100vh-60px)]">
        
        {/* Sidebar - Navigation Cards */}
        <div className="w-full md:w-1/4">
          <NavigationCards />
        </div>

        {/* Main Content - Display Files */}
        <div className="w-full md:w-3/4 overflow-y-auto bg-white rounded-lg shadow mt-4 md:mt-0">
          <DisplayAllFiles />
        </div>

      </div>
    </div>
  )
}

export default Home
