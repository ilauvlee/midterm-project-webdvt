import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Layout = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-pattern" aria-hidden="true" />

        <div className="brand">
          <div className="brand-seal" aria-hidden="true">
            桜
          </div>

          <div className="brand-copy">
            <span className="eyebrow eyebrow-light">家計簿 · KAKEIBO</span>
            <h2>Lauv Lee's FT</h2>
            <p>Personal finance, inspired by Japanese simplicity.</p>
          </div>
        </div>

        <div className="sidebar-divider">
          <span>日々の記録</span>
        </div>

        <nav className="navigation" aria-label="Main navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">
              <i className="fas fa-house"></i>
            </span>
            <span className="nav-copy">
              <strong>Dashboard</strong>
              <small>概要</small>
            </span>
          </NavLink>

          <NavLink
            to="/add"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">
              <i className="fas fa-plus"></i>
            </span>
            <span className="nav-copy">
              <strong>Add Transaction</strong>
              <small>取引を追加</small>
            </span>
          </NavLink>

          <NavLink
            to="/summary"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">
              <i className="fas fa-chart-pie"></i>
            </span>
            <span className="nav-copy">
              <strong>Summary</strong>
              <small>まとめ</small>
            </span>
          </NavLink>
        </nav>

        <div className="sidebar-quote">
          <span className="quote-mark">「</span>
          <p>Small records create clear habits.</p>
          <span className="quote-jp">小さな記録、大きな安心。</span>
        </div>

        <div className="sidebar-footer">
          <button className="theme-button" onClick={toggleTheme} type="button">
            <span className="theme-icon">
              <i
                className={`fas ${
                  theme === "light" ? "fa-moon" : "fa-sun"
                }`}
              ></i>
            </span>
            <span>
              <strong>{theme === "light" ? "Dark Mode" : "Light Mode"}</strong>
              <small>{theme === "light" ? "夜の表示" : "昼の表示"}</small>
            </span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <div className="top-decoration" aria-hidden="true">
          <span>桜</span>
          <div />
          <span>暮</span>
        </div>

        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
