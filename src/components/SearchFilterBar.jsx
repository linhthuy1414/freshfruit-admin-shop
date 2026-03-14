import { Search, SlidersHorizontal } from 'lucide-react'

function SearchFilterBar({ searchTerm, onSearchChange, selectedOrigin, onOriginChange, origins, sortBy, onSortChange }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-5 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm trái cây..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-gray-400"
          />
        </div>

        {/* Origin Filter */}
        <div className="relative">
          <select
            value={selectedOrigin}
            onChange={(e) => onOriginChange(e.target.value)}
            className="appearance-none w-full md:w-48 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer pr-10"
          >
            <option value="">Tất cả xuất xứ</option>
            {origins.map((origin) => (
              <option key={origin} value={origin}>
                {origin}
              </option>
            ))}
          </select>
          <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none w-full md:w-48 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer pr-10"
          >
            <option value="default">Mặc định</option>
            <option value="price-asc">Giá thấp → cao</option>
            <option value="price-desc">Giá cao → thấp</option>
            <option value="rating">Đánh giá cao</option>
            <option value="name">Tên A-Z</option>
          </select>
          <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}

export default SearchFilterBar
