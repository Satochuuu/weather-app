type SearchHistoryProps = {
  histories: string[];
  onSelectCity: (city: string) => void;
  onClear: () => void;
};

function SearchHistory({
  histories,
  onSelectCity,
  onClear,
}: SearchHistoryProps) {
  if (histories.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 rounded-xl bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">
          検索履歴
        </h2>

        <button
          onClick={onClear}
          className="text-sm text-gray-500 hover:text-red-500"
        >
          クリア
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {histories.map((history) => (
          <button
            key={history}
            onClick={() => onSelectCity(history)}
            className="
              rounded-full
              bg-sky-100
              px-4
              py-2
              text-sm
              font-semibold
              text-sky-700
              hover:bg-sky-200
            "
          >
            {history}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;