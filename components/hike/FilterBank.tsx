import { Hike } from '@/lib/types'
import { Dispatch, SetStateAction } from 'react'

type FilterBankProps = {
  allHikes: Hike[]
  setFilteredHikes: Dispatch<SetStateAction<Hike[]>>
}

export default function FilterBank({ allHikes, setFilteredHikes }: FilterBankProps) {
  // Example filter function
  const handleFilter = (criteria: string) => {
    const filtered = allHikes.filter(hike => {
      // Your filter logic here
      return true
    })
    setFilteredHikes(filtered)
  }

  const handleDistanceFilter = (minDistance: number, maxDistance: number) => {
    const filtered = allHikes.filter(hike => {
      const hikeDistance = parseInt(hike.distance, 10);
      return hikeDistance >= minDistance && hikeDistance <= maxDistance;
    });
    setFilteredHikes(filtered);
  };

  return (
    <div className="mb-6 text-xs">
      <div className="flex items-center gap-4">
        <label htmlFor="minDistance" className="min-w-24">
          Distance:
        </label>
        <input
          type="number"
          id="minDistance"
          min="0"
          max="30"
          defaultValue="0"
          className="w-20 px-2 py-1 border rounded"
          onChange={(e) => {
            const min = parseInt(e.target.value || "0", 10);
            const max = parseInt((document.getElementById('maxDistance') as HTMLInputElement).value || "30", 10);
            handleDistanceFilter(min, max);
          }}
        />
        <span>á</span>
        <input
          type="number"
          id="maxDistance"
          min="0"
          max="30"
          defaultValue="30"
          className="w-20 px-2 py-1 border rounded"
          onChange={(e) => {
            const max = parseInt(e.target.value || "30", 10);
            const min = parseInt((document.getElementById('minDistance') as HTMLInputElement).value || "0", 10);
            handleDistanceFilter(min, max);
          }}
        />
        <span>km</span>
      </div>
    </div>
  )
}