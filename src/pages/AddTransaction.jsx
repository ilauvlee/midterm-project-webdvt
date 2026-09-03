import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTransactions from "../hooks/useTransactions";

const AddTransaction = () => {
  const navigate = useNavigate();
  const { addTransaction } = useTransactions();
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "Expense",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

    navigate("/");
  };

  return (
    <>
      <div className="page-header japanese-page-header">
        <div>
          <span className="eyebrow">新しい記録 · NEW ENTRY</span>
          <h1>Add Transaction</h1>
          <p>Record one clear entry at a time.</p>
        </div>
        <div className="page-kanji" aria-hidden="true">記</div>
      </div>

      <div className="form-layout">
        <section className="form-card">
          <div className="form-card-heading">
            <span className="form-step">01</span>
            <div>
              <span className="section-jp">取引の詳細</span>
              <h2>Transaction details</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">
                <span>Transaction Title</span>
                <small>取引名</small>
              </label>
              <input
                id="title"
                name="title"
                className="form-control"
                type="text"
                placeholder="e.g. Monthly Allowance"
                value={formData.title}
                onChange={handleChange}
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
                  name="amount"
                  className="form-control"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={handleChange}
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
                name="type"
                className="form-control"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Expense">Expense · 支出</option>
                <option value="Income">Income · 収入</option>
              </select>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate("/")}
              >
                <i className="fas fa-arrow-left"></i> Cancel
              </button>

              <button type="submit" className="primary-button">
                <i className="fas fa-check"></i> Save Transaction
              </button>
            </div>
          </form>
        </section>

        <aside className="form-note-card">
          <span className="note-symbol">整</span>
          <span className="section-jp">KAKEIBO PRINCIPLE</span>
          <h3>Keep the record simple.</h3>
          <p>
            A clean ledger is easier to maintain. Give each transaction a clear
            name and choose whether it belongs to income or expenses.
          </p>
          <div className="note-rule" />
          <span className="note-japanese">簡潔に、丁寧に。</span>
        </aside>
      </div>
    </>
  );
};

export default AddTransaction;
