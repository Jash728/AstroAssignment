import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AstrologerEdit from './components/AstrologerEdit';
import Astrolist from './components/Astrolist';
import AstrologerForm from './components/AstrologerForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Astrolist />} />
        <Route path="/add" element={<AstrologerForm />} />
        <Route path="/edit/:id" element={<AstrologerEdit />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;