import { useState } from "react";
import { Link } from "react-router-dom";
import useTransactions from "../hooks/useTransactions";

const Dashboard = () => {
  const { transactions, addTransaction } = useTransactions();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "Expense",
  });

  const income = transactions
    .filter((tx) => tx.type === "Income")
    .reduce((total, tx) => total + Number(tx.amount), 0);

  const expenses = transactions
    .filter((tx) => tx.type === "Expense")
    .reduce((total, tx) => total + Number(tx.amount), 0);

  const balance = income - expenses;
  const recentTransactions = [...transactions].reverse().slice(0, 6);

  const formatAmount = (amount) =>
    `₱${Number(amount).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.amount) {
      alert("Please fill out all required fields.");
      return;
    }

    if (Number(formData.amount) <= 0) {
      alert("Amount must be greater than zero.");
      return;
    }

    addTransaction({
      title: formData.title.trim(),
      amount: Number(formData.amount),
      type: formData.type,
    });

    setFormData({ title: "", amount: "", type: "Expense" });
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ title: "", amount: "", type: "Expense" });
  };

  return (
    <>
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">おかえりなさい · WELCOME BACK</span>
          <h1>Your money, <em>clearly arranged.</em></h1>
          <p>
            A calm overview of your balance, income, expenses, and recent
            activity.
          </p>
        </div>

        <button className="primary-button" onClick={() => setShowModal(true)}>
          <span className="button-kanji">記</span>
          <span>Add Transaction</span>
          <i className="fas fa-arrow-right"></i>
        </button>

        <div className="hero-sakura" aria-hidden="true">桜</div>
      </section>

      <div className="section-heading">
        <div>
          <span className="section-jp">現在の状況</span>
          <h2>Financial overview</h2>
        </div>
        <span className="section-number">01</span>
      </div>

      <div className="stats-grid">
        <article className="stat-card stat-balance">
          <div className="stat-card-header">
            <div>
              <span className="stat-kicker">残高</span>
              <span className="stat-label">Current Balance</span>
            </div>
            <span className="stat-icon">
              <i className="fas fa-wallet"></i>
            </span>
          </div>
          <div className="stat-value">{formatAmount(balance)}</div>
          <p className="stat-subtitle">Available after recorded expenses</p>
        </article>

        <article className="stat-card">
          <div className="stat-card-header">
            <div>
              <span className="stat-kicker">収入</span>
              <span className="stat-label">Total Income</span>
            </div>
            <span className="stat-icon income-icon">
              <i className="fas fa-arrow-trend-up"></i>
            </span>
          </div>
          <div className="stat-value">{formatAmount(income)}</div>
          <p className="stat-subtitle">
            {transactions.filter((tx) => tx.type === "Income").length} income
            transaction(s)
          </p>
        </article>

        <article className="stat-card">
          <div className="stat-card-header">
            <div>
              <span className="stat-kicker">支出</span>
              <span className="stat-label">Total Expenses</span>
            </div>
            <span className="stat-icon expense-icon">
              <i className="fas fa-arrow-trend-down"></i>
            </span>
          </div>
          <div className="stat-value">{formatAmount(expenses)}</div>
          <p className="stat-subtitle">
            {transactions.filter((tx) => tx.type === "Expense").length} expense
            transaction(s)
          </p>
        </article>
      </div>

      <div className="section-heading section-heading-spaced">
        <div>
          <span className="section-jp">最近の記録</span>
          <h2>Recent transactions</h2>
        </div>
        <span className="section-number">02</span>
      </div>

      <section className="content-card transactions-card">
        <div className="card-header">
          <div>
            <span className="card-kicker">LATEST ACTIVITY</span>
            <h3>Daily ledger</h3>
          </div>
          <Link to="/summary" className="text-link">
            View Summary <i className="fas fa-arrow-right"></i>
          </Link>
        </div>

        {recentTransactions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-symbol">帳</div>
            <span className="empty-jp">まだ記録がありません</span>
            <h3>Your ledger is still empty</h3>
            <p>Add your first transaction to begin tracking your finances.</p>
            <button className="secondary-button" onClick={() => setShowModal(true)}>
              <i className="fas fa-plus"></i> Add first transaction
            </button>
          </div>
        ) : (
          <div className="transaction-list">
            {recentTransactions.map((tx, index) => (
              <Link
                className="transaction-item"
                key={tx.id}
                to={`/transaction/${tx.id}`}
              >
                <span className="transaction-index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="transaction-main">
                  <div className={`transaction-icon ${tx.type.toLowerCase()}`}>
                    <i
                      className={`fas ${
                        tx.type === "Income"
                          ? "fa-arrow-down"
                          : "fa-arrow-up"
                      }`}
                    ></i>
                  </div>

                  <div>
                    <div className="transaction-title">{tx.title}</div>
                    <div className="transaction-type">
                      {tx.type === "Income" ? "収入 · Income" : "支出 · Expense"}
                    </div>
                  </div>
                </div>

                <div className="transaction-right">
                  <span className={`amount ${tx.type.toLowerCase()}`}>
                    {tx.type === "Income" ? "+" : "-"}
                    {formatAmount(tx.amount)}
                  </span>
                  <span className="detail-link">
                    Details <i className="fas fa-chevron-right"></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {showModal && (
        <div
          className="modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="modal" role="dialog" aria-modal="true">
            <div className="modal-accent" />

            <div className="modal-header">
              <div>
                <span className="eyebrow">新しい記録 · NEW ENTRY</span>
                <h2>Add Transaction</h2>
                <p>Record a new income or expense in your ledger.</p>
              </div>

              <button className="modal-close" onClick={closeModal} aria-label="Close">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">
                  <span>Transaction Title</span>
                  <small>取引名</small>
                </label>
                <input
                  id="title"
                  className="form-control"
                  type="text"
                  placeholder="e.g. Monthly Allowance"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label htmlFor="amount">
                  <span>Amount</span>
                  <small>金額</small>
                </label>
                <div className="input-with-prefix">
                  <span>₱</span>
                  <input
                    id="amount"
                    className="form-control"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="type">
                  <span>Transaction Type</span>
                  <small>種類</small>
                </label>
                <select
                  id="type"
                  className="form-control"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <option value="Expense">Expense · 支出</option>
                  <option value="Income">Income · 収入</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="button" className="secondary-button" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  <i className="fas fa-check"></i> Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
