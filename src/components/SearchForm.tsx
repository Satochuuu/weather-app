type SearchFormProps = {
  city: string;
  onCityChange: (value: string) => void;
  onSearch: () => void;
  loading: boolean;
};

function SearchForm({
  city,
  onCityChange,
  onSearch,
  onCurrentLocationSearch,
  loading,
}: SearchFormProps) {
  return (
    <>
      <button
        onClick={onCurrentLocationSearch}
        disabled={loading}
        className="
          mb-6
          w-full
          rounded-lg
          bg-emerald-500
          py-3
          text-white
          hover:bg-emerald-600
          disabled:cursor-not-allowed
          disabled:bg-gray-400
        "
      >
        📍現在地の天気を見る
      </button>

      <input
        type="text"
        placeholder="都市名を入力"
        value={city}
        onChange={(e) => onCityChange(e.target.value)}
        className="mb-4 w-full rounded-lg border border-gray-300 p-3"
      />

      <button
        onClick={onSearch}
        disabled={loading}
        className="
          w-full
          rounded-lg
          bg-sky-500
          py-3
          text-white
          hover:bg-sky-600
          disabled:cursor-not-allowed
          disabled:bg-gray-400
        "
      >
        {loading ? "検索中..." : "検索"}
      </button>
    </>
  );
}

export default SearchForm;