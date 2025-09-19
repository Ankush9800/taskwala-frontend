import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { 
    Home, 
    ArrowLeft, 
    RefreshCw, 
    Search, 
    AlertTriangle, 
    Compass 
} from "lucide-react";

const NotFound = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const attemptedPath = location.pathname;

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-[#F97316]/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#155a69]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#10B981]/5 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
                <div className="w-full max-w-4xl text-center">
                    {/* Large 404 with floating icon */}
                    <div className="relative mb-8">
                        <div className="text-[180px] md:text-[240px] font-bold text-transparent bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-clip-text leading-none">
                            404
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <AlertTriangle className="w-16 h-16 text-[#F97316] animate-bounce" />
                        </div>
                    </div>

                    {/* Error Message */}
                    <div className="mb-8 space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Page Not Found
                        </h1>
                        <p className="text-xl text-gray-400 mb-6">
                            Oops! The page you're looking for seems to have wandered off.
                        </p>
                        
                        {/* Attempted Path Display */}
                        <Card className="bg-gray-800/50 border-gray-600 backdrop-blur-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-center gap-2 text-sm">
                                    <span className="text-gray-400">Attempted path:</span>
                                    <code className="px-2 py-1 bg-gray-700 text-[#F97316] rounded font-mono">
                                        {attemptedPath}
                                    </code>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <Link to="/">
                            <Button className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold py-3 transition-all duration-200 hover:scale-105 shadow-lg">
                                <Home className="w-4 h-4 mr-2" />
                                Go Home
                            </Button>
                        </Link>

                        <Button 
                            onClick={handleGoBack}
                            variant="outline"
                            className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 py-3 transition-all duration-200 hover:scale-105"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Go Back
                        </Button>

                        <Link to="/campaigns">
                            <Button className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-semibold py-3 transition-all duration-200 hover:scale-105 shadow-lg">
                                <Search className="w-4 h-4 mr-2" />
                                Campaigns
                            </Button>
                        </Link>

                        <Button 
                            onClick={handleRefresh}
                            variant="outline"
                            className="w-full border-[#155a69] text-[#155a69] hover:bg-[#155a69] hover:text-white py-3 transition-all duration-200 hover:scale-105"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Refresh
                        </Button>
                    </div>

                    {/* Help Section */}
                    <Card className="bg-gray-800/30 border-gray-600 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-center mb-4">
                                <Compass className="w-6 h-6 text-[#F97316] mr-2" />
                                <h3 className="text-lg font-semibold text-white">Need Help?</h3>
                            </div>
                            <p className="text-gray-400 mb-4">
                                If you believe this is an error, here are some things you can try:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center text-gray-300">
                                    <div className="w-2 h-2 bg-[#10B981] rounded-full mr-3" />
                                    Check the URL for typos
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <div className="w-2 h-2 bg-[#10B981] rounded-full mr-3" />
                                    Try refreshing the page
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <div className="w-2 h-2 bg-[#10B981] rounded-full mr-3" />
                                    Go back to the homepage
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <div className="w-2 h-2 bg-[#10B981] rounded-full mr-3" />
                                    Contact support if needed
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Footer Message */}
                    <div className="mt-8 flex items-center justify-center gap-2 text-gray-500">
                        <span>✨</span>
                        <span>Don't worry, even the best explorers get lost sometimes!</span>
                        <span>🚀</span>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default NotFound;
