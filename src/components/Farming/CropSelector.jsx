import { CROPS } from '../../data/farmingTips';

export default function CropSelector({ value, onChange }) {
  return (
    <div className="form-group" style={{ maxWidth: 360 }}>
      <label className="form-label" htmlFor="crop-selector">
        🌱 Select Crop
      </label>
      <select
        id="crop-selector"
        className="form-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">— Choose a crop —</option>
        {CROPS.map((crop) => (
          <option key={crop} value={crop}>{crop}</option>
        ))}
      </select>
    </div>
  );
}
