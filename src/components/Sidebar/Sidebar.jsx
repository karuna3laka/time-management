import { NavLink } from 'react-router-dom';
import { FaTasks, FaChartBar, FaCog, FaClock } from 'react-icons/fa';
import './Sidebar.css';

export function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h2>Kavindu</h2>
      </div>
      <ul className="nav-list">
        <NavItem to="/" icon={<FaClock />} text="Dashboard" />
        <NavItem to="/tasks" icon={<FaTasks />} text="Message" />
        <NavItem to="/analytics" icon={<FaChartBar />} text="Tasks" />
        <NavItem to="/settings" icon={<FaCog />} text="Planning" />
        <NavItem to="/global" icon={<FaCog />} text="Global" />
        <NavItem to="/analytics" icon={<FaCog />} text="Analytics" />
      </ul>
    </nav>
  );
}

function NavItem({ to, icon, text }) {
  return (
    <li className="nav-item">
      <NavLink 
        to={to} 
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      >
        <span className="nav-icon">{icon}</span>
        <span className="nav-text">{text}</span>
      </NavLink>
    </li>
  );
}