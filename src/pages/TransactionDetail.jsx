import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTransactions from "../hooks/useTransactions";

const TransactionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { transactions, updateTransaction, deleteTransaction } = useTransactions();
  const transaction = transactions.find((tx) => tx.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "Expense",
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        title: transaction.title,
        amount: transaction.amount,
        type: transaction.type,
      });
    }
  }, [transaction]);

  const formatAmount = (amount) =>
    `₱${Number(amount).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const handleDelete = () => {
    if (window.confirm("Delete this transaction?")) {
      deleteTransaction(id);
      navigate("/");
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || Number(formData.amount) <= 0) {
      alert("Please enter a valid title and amount.");
      return;
    }

    updateTransaction(id, {
      title: formData.title.trim(),
      amount: Number(formData.amount),
      type: formData.type,
    });
    setIsEditing(false);
  };

  if (!transaction) {
    return (
      <div className="not-found-card">
        <span className="not-found-kanji">無</span>
        <span className="eyebrow">NOT FOUND · 見つかりません</span>
        <h1>Transaction not found</h1>
        <p>This record may have been removed or does not exist.</p>
        <button className="primary-button" onClick={() => navigate("/")}> 
          <i className="fas fa-arrow-left"></i> Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="page-header japanese-page-header">
        <div>
          <span className="eyebrow">取引詳細 · TRANSACTION DETAIL</span>
          <h1>{transaction.title}</h1>
          <p>Review or update this ledger entry.</p>
        </div>
        <div className="page-kanji" aria-hidden="true">帳</div>
      </div>

      <div className="detail-layout">
        <section className="detail-card">
          <div className="detail-card-top">
            <div className={`detail-type-seal ${transaction.type.toLowerCase()}`}>
              {transaction.type === "Income" ? "収" : "支"}
            </div>
            <div>
              <span className="section-jp">
                {transaction.type === "Income" ? "収入" : "支出"}
              </span>
              <h2>{transaction.type}</h2>
            </div>
          </div>

          {!isEditing ? (
            <div className="detail-rows">
              <div className="detail-row">
                <span className="detail-label">Transaction title <small>取引名</small></span>
                <span className="detail-value">{transaction.title}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Amount <small>金額</small></span>
                <span className={`detail-value amount ${transaction.type.toLowerCase()}`}>
                  {transaction.type === "Income" ? "+" : "-"}
                  {formatAmount(transaction.amount)}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Type <small>種類</small></span>
                <span className="detail-value">{transaction.type}</span>
              </div>
              <div className="detail-row detail-id-row">
                <span className="detail-label">Record ID <small>識別番号</small></span>
                <code className="detail-id">{transaction.id}</code>
              </div>
            </div>
          ) : (
            <form className="detail-edit-form" onSubmit={handleSave}>
              <div className="form-group">
                <label htmlFor="edit-title">
                  <span>Transaction Title</span><small>取引名</small>
                </label>
                <input
                  id="edit-title"
                  className="form-control"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-amount">
                  <span>Amount</span><small>金額</small>
                </label>
                <div className="input-with-prefix">
                  <span>₱</span>
                  <input
                    id="edit-amount"
                    className="form-control"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="edit-type">
                  <span>Transaction Type</span><small>種類</small>
                </label>
                <select
                  id="edit-type"
                  className="form-control"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="Expense">Expense · 支出</option>
                  <option value="Income">Income · 収入</option>
                </select>
              </div>

              <div className="form-actions detail-edit-actions">
                <button type="button" className="secondary-button" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  <i className="fas fa-check"></i> Save Changes
                </button>
              </div>
            </form>
          )}

          {!isEditing && (
            <div className="detail-actions">
              <button className="secondary-button" onClick={() => navigate(-1)}>
                <i className="fas fa-arrow-left"></i> Back
              </button>
              <div className="detail-actions-right">
                <button className="secondary-button" onClick={() => setIsEditing(true)}>
                  <i className="fas fa-pen"></i> Edit
                </button>
                <button className="danger-button" onClick={handleDelete}>
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          )}
        </section>

        <aside className="detail-side-card">
          <span className="section-jp">LEDGER NOTE</span>
          <h3>One record at a time.</h3>
          <p>
            Keeping each entry accurate makes your summary more useful and your
            spending easier to understand.
          </p>
          <div className="vertical-jp">丁<br />寧<br />な<br />記<br />録</div>
        </aside>
      </div>
    </>
  );
};

export default TransactionDetail;
