import React from 'react'

export default function LoadingScreen() {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
            {/* Simple Clean Spinner */}
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-800 border-t-amber-400"></div>
            
            {/* Quick Text */}
            <div className="text-center">
                <h1 className="text-xl font-bold text-white">Loading Questions...</h1>
                <p className="text-slate-400 text-xs mt-1">Please wait a moment...</p>
            </div>
        </div>
    )
}