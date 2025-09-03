import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const InteractiveWorldMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [clientLocations, setClientLocations] = useState([]);

  // Sample client locations with timezone data
  const sampleLocations = [
    {
      id: 1,
      city: 'New York',
      country: 'USA',
      lat: 40.7128,
      lng: -74.0060,
      timezone: 'America/New_York',
      clients: 15,
      projects: 32,
      flag: '🇺🇸'
    },
    {
      id: 2,
      city: 'London',
      country: 'UK',
      lat: 51.5074,
      lng: -0.1278,
      timezone: 'Europe/London',
      clients: 12,
      projects: 28,
      flag: '🇬🇧'
    },
    {
      id: 3,
      city: 'Tokyo',
      country: 'Japan',
      lat: 35.6762,
      lng: 139.6503,
      timezone: 'Asia/Tokyo',
      clients: 8,
      projects: 18,
      flag: '🇯🇵'
    },
    {
      id: 4,
      city: 'Sydney',
      country: 'Australia',
      lat: -33.8688,
      lng: 151.2093,
      timezone: 'Australia/Sydney',
      clients: 6,
      projects: 14,
      flag: '🇦🇺'
    },
    {
      id: 5,
      city: 'Toronto',
      country: 'Canada',
      lat: 43.6532,
      lng: -79.3832,
      timezone: 'America/Toronto',
      clients: 9,
      projects: 21,
      flag: '🇨🇦'
    },
    {
      id: 6,
      city: 'Berlin',
      country: 'Germany',
      lat: 52.5200,
      lng: 13.4050,
      timezone: 'Europe/Berlin',
      clients: 7,
      projects: 16,
      flag: '🇩🇪'
    }
  ];

  useEffect(() => {
    setClientLocations(sampleLocations);
  }, []);

  const getLocalTime = (timezone) => {
    try {
      return new Date()?.toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      return 'N/A';
    }
  };

  const getBusinessHours = (timezone) => {
    try {
      const now = new Date();
      const localHour = parseInt(now?.toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        hour12: false
      }));
      
      return localHour >= 9 && localHour <= 17;
    } catch (error) {
      return false;
    }
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const suggestMeetingTime = (timezone) => {
    const userTimezone = Intl.DateTimeFormat()?.resolvedOptions()?.timeZone;
    const tomorrow = new Date();
    tomorrow?.setDate(tomorrow?.getDate() + 1);
    
    // Suggest 10 AM in the client's timezone
    const suggestedTime = new Date(tomorrow);
    suggestedTime?.setHours(10, 0, 0, 0);
    
    return suggestedTime?.toLocaleString('en-US', {
      timeZone: timezone,
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="glass rounded-2xl p-6 border border-accent/20 shadow-depth">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent via-primary to-secondary p-2 glow-accent">
            <Icon name="Globe" size={24} className="text-background" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Global Client Network
            </h3>
            <p className="text-sm text-muted-foreground">
              Click locations to see timezone-aware meeting suggestions
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Total Clients</div>
          <div className="text-lg font-data font-bold text-accent">
            {clientLocations?.reduce((sum, loc) => sum + loc?.clients, 0)}
          </div>
        </div>
      </div>
      {/* World Map Container */}
      <div className="relative mb-6">
        <div className="w-full h-80 rounded-xl overflow-hidden border border-border/30 bg-muted/10">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Global Client Locations"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=40.7128,-74.0060&z=2&output=embed"
            className="filter grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
        
        {/* Animated Location Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {clientLocations?.map((location, index) => (
            <div
              key={location?.id}
              className="absolute animate-pulse"
              style={{
                left: `${20 + (index * 12)}%`,
                top: `${30 + (index % 3) * 15}%`,
                animationDelay: `${index * 0.5}s`
              }}
            >
              <div className="w-4 h-4 bg-accent rounded-full glow-accent animate-ping"></div>
              <div className="absolute inset-0 w-4 h-4 bg-accent rounded-full glow-accent"></div>
            </div>
          ))}
        </div>
      </div>
      {/* Location Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {clientLocations?.map((location) => (
          <div
            key={location?.id}
            onClick={() => handleLocationClick(location)}
            className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer hover:scale-102 ${
              selectedLocation?.id === location?.id
                ? 'border-accent bg-accent/10 glow-accent' :'border-border hover:border-accent/30 bg-muted/10'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{location?.flag}</span>
                <div>
                  <h4 className="font-medium text-foreground text-sm">
                    {location?.city}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {location?.country}
                  </p>
                </div>
              </div>
              
              <div className={`w-2 h-2 rounded-full ${
                getBusinessHours(location?.timezone) 
                  ? 'bg-accent animate-pulse' :'bg-muted-foreground'
              }`}></div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Local Time:</span>
                <span className="font-data text-foreground">
                  {getLocalTime(location?.timezone)}
                </span>
              </div>
              
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Clients:</span>
                <span className="font-data text-accent">
                  {location?.clients}
                </span>
              </div>
              
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Projects:</span>
                <span className="font-data text-primary">
                  {location?.projects}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Selected Location Details */}
      {selectedLocation && (
        <div className="p-6 rounded-xl bg-gradient-to-r from-accent/5 via-primary/5 to-secondary/5 border border-accent/20 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{selectedLocation?.flag}</span>
              <div>
                <h4 className="text-lg font-heading font-semibold text-foreground">
                  {selectedLocation?.city}, {selectedLocation?.country}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {selectedLocation?.clients} active clients • {selectedLocation?.projects} completed projects
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Current Time</div>
              <div className="text-lg font-data font-bold text-accent">
                {getLocalTime(selectedLocation?.timezone)}
              </div>
              <div className={`text-xs ${
                getBusinessHours(selectedLocation?.timezone) 
                  ? 'text-accent' :'text-muted-foreground'
              }`}>
                {getBusinessHours(selectedLocation?.timezone) 
                  ? '🟢 Business Hours' :'🔴 After Hours'
                }
              </div>
            </div>
          </div>
          
          {/* Meeting Suggestion */}
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">
                Suggested Meeting Time
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {suggestMeetingTime(selectedLocation?.timezone)}
            </p>
            
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors">
                Schedule Meeting
              </button>
              <button className="px-3 py-1 text-xs bg-secondary/20 text-secondary rounded-lg hover:bg-secondary/30 transition-colors">
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Global Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 rounded-lg bg-primary/5 border border-primary/20">
          <Icon name="Users" size={20} className="text-primary mx-auto mb-1" />
          <div className="text-lg font-data font-bold text-foreground">
            {clientLocations?.reduce((sum, loc) => sum + loc?.clients, 0)}
          </div>
          <div className="text-xs text-muted-foreground">Total Clients</div>
        </div>
        
        <div className="text-center p-3 rounded-lg bg-secondary/5 border border-secondary/20">
          <Icon name="Briefcase" size={20} className="text-secondary mx-auto mb-1" />
          <div className="text-lg font-data font-bold text-foreground">
            {clientLocations?.reduce((sum, loc) => sum + loc?.projects, 0)}
          </div>
          <div className="text-xs text-muted-foreground">Projects Done</div>
        </div>
        
        <div className="text-center p-3 rounded-lg bg-accent/5 border border-accent/20">
          <Icon name="Globe" size={20} className="text-accent mx-auto mb-1" />
          <div className="text-lg font-data font-bold text-foreground">
            {clientLocations?.length}
          </div>
          <div className="text-xs text-muted-foreground">Countries</div>
        </div>
        
        <div className="text-center p-3 rounded-lg bg-warning/5 border border-warning/20">
          <Icon name="Clock" size={20} className="text-warning mx-auto mb-1" />
          <div className="text-lg font-data font-bold text-foreground">
            {clientLocations?.filter(loc => getBusinessHours(loc?.timezone))?.length}
          </div>
          <div className="text-xs text-muted-foreground">Online Now</div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveWorldMap;