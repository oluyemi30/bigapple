export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-white font-bold text-2xl">AC</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">AC BIG APPLE</h1>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  )
}
