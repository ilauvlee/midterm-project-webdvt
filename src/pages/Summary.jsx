import { Link } from "react-router-dom";
import useTransactions from "../hooks/useTransactions";

const Summary = () => {
  const { transactions } = useTransactions();

  const income = transactions
    .filter((tx) => tx.type === "Income")
    .reduce((total, tx) => total + Number(tx.amount), 0);

  const expenses = transactions
    .filter((tx) => tx.type === "Expense")
    .reduce((total, tx) => total + Number(tx.amount), 0);

  const balance = income - expenses;

  const formatAmount = (amount) =>
    `₱${Number(amount).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <>
      <div className="page-header japanese-page-header">
        <div>
          <span className="eyebrow">まとめ · SUMMARY</span>
          <h1>Financial Summary</h1>
          <p>A clean view of everything you have recorded.</p>
        </div>
        <div className="page-kanji" aria-hidden="true">計</div>
      </div>

      <div className="summary-grid">
        <article className="summary-item">
          <span className="summary-number">01</span>
          <span className="section-jp">総収入</span>
          <h3>Total Income</h3>
          <p className="amount income">{formatAmount(income)}</p>
        </article>

        <article className="summary-item">
          <span className="summary-number">02</span>
          <span className="section-jp">総支出</span>
          <h3>Total Expenses</h3>
          <p className="amount expense">{formatAmount(expenses)}</p>
        </article>

        <article className="summary-item">
          <span className="summary-number">03</span>
          <span className="section-jp">純残高</span>
          <h3>Net Balance</h3>
          <p>{formatAmount(balance)}</p>
        </article>

        <article className="summary-item">
          <span className="summary-number">04</span>
          <span className="section-jp">取引件数</span>
          <h3>Total Transactions</h3>
          <p>{transactions.length}</p>
        </article>
      </div>

      <div className="section-heading section-heading-spaced">
        <div>
          <span className="section-jp">全ての記録</span>
          <h2>Transaction ledger</h2>
        </div>
        <Link to="/add" className="secondary-button compact-button">
          <i className="fas fa-plus"></i> Add Transaction
        </Link>
      </div>

      <section className="content-card transactions-card">
        <div className="card-header ledger-header">
          <div>
            <span className="card-kicker">COMPLETE HISTORY</span>
            <h3>All entries</h3>
          </div>
          <span className="ledger-count">{transactions.length} records</span>
        </div>

        {transactions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-symbol">無</div>
            <span className="empty-jp">データがありません</span>
            <h3>No data available</h3>
            <p>Add transactions to generate your financial summary.</p>
          </div>
        ) : (
          <div className="transaction-list">
            {[...transactions].reverse().map((tx, index) => (
              <Link
                to={`/transaction/${tx.id}`}
                className="transaction-item"
                key={tx.id}
              >
                <span className="transaction-index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="transaction-main">
                  <div className={`transaction-icon ${tx.type.toLowerCase()}`}>
                    <i
                      className={`fas ${
                        tx.type === "Income" ? "fa-arrow-down" : "fa-arrow-up"
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
                    Open <i className="fas fa-chevron-right"></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Summary;
