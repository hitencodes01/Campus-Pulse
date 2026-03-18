

interface Prop {
  setData: (e: string) => void;
  placeholder : string;
}

export default function SearchInput({ setData , placeholder }: Prop) {
  return (
    <div className="my-2">
      <label className="input shadow-2xs shadow-blue-400">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
            className="text-blue-400 "
          type="search"
          onChange={(e) => setData(e.target.value)}
          required
          placeholder={placeholder}
        />
      </label>
    </div>
  );
}
