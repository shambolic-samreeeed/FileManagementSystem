import DisplayAllFiles from "../components/Files/DisplayAllFiles"
import NavigationCards from "../components/Home/NavigationCards"
import NavBar from "../components/NavBar/NavBar"

const Home = () => {
  return (
    <div>
      <NavBar />
      <div style={{ display: 'flex', height: 'calc(100vh - 60px)', gap: '1rem' }}>
        
        <div style={{ flexBasis: '25%', display: 'flex', flexDirection: 'column' }}>
          <NavigationCards />
        </div>
        
        <div style={{ flexBasis: '75%', overflowY: 'auto' }} className="mt-8 rounded-lg shadow bg-white">
          <DisplayAllFiles />
        </div>
      </div>
    </div>
  )
}

export default Home
