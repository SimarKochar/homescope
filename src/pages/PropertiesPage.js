// src/pages/PropertiesPage.js
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyList from '../components/PropertyList/PropertyList';
import './PropertiesPage.css'; // Ensure CSS is imported

const MAX_COMPARE_ITEMS = 3; // Use the same constant as App.js

// Receive new props: comparisonList, onToggleComparison, onOpenCompare
const PropertiesPage = ({
    properties,
    favorites,
    onToggleFavorite,
    comparisonList,
    onToggleComparison,
    onOpenCompare // Handler to open the comparison modal
}) => {
    // --- State and Effects for Search, Filter, Sort ---
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const [displayedProperties, setDisplayedProperties] = useState(properties);
    const [sortOption, setSortOption] = useState('default');
    const [minBedrooms, setMinBedrooms] = useState(0);

    useEffect(() => {
        let result = [...properties]; // Start with full list

        // Apply Search Filter
        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.address.toLowerCase().includes(lowerCaseQuery) ||
                (p.description && p.description.toLowerCase().includes(lowerCaseQuery))
            );
        }

        // Apply Bedroom Filter
        if (minBedrooms > 0) {
            result = result.filter(p => p.bedrooms >= minBedrooms);
        }

        // Apply Sorting
        switch (sortOption) {
            case 'price-asc': result.sort((a, b) => a.price - b.price); break;
            case 'price-desc': result.sort((a, b) => b.price - a.price); break;
            case 'beds-asc': result.sort((a, b) => a.bedrooms - b.bedrooms); break;
            case 'beds-desc': result.sort((a, b) => b.bedrooms - b.bedrooms); break;
            default: result.sort((a, b) => a.id - b.id); break;
        }

        setDisplayedProperties(result); // Update the list to display

    }, [properties, sortOption, minBedrooms, searchQuery]); // Dependencies

    // --- Event Handlers for Controls ---
    const handleSortChange = (event) => setSortOption(event.target.value);
    const handleBedroomChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setMinBedrooms(isNaN(value) ? 0 : value);
    };

    // Determine if compare button should be enabled
    const canCompare = comparisonList.length >= 2 && comparisonList.length <= MAX_COMPARE_ITEMS;

    // --- Render JSX ---
    return (
        <div className="properties-page-container">
            {/* Page Headings */}
            {searchQuery && (
                <h2 className="page-subtitle">
                    Showing results for: <em>"{searchQuery}"</em>
                </h2>
            )}
            {!searchQuery && (
                <h1 className="page-title">All Properties</h1>
            )}

            {/* Filter, Sort, and Compare Controls */}
            <div className="properties-controls">
                {/* Bedroom Filter */}
                <div className="control-group">
                    <label htmlFor="bedrooms">Min Bedrooms:</label>
                    <select id="bedrooms" value={minBedrooms} onChange={handleBedroomChange}>
                        <option value="0">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                    </select>
                </div>

                {/* Sort Filter */}
                <div className="control-group">
                    <label htmlFor="sort">Sort By:</label>
                    <select id="sort" value={sortOption} onChange={handleSortChange}>
                        <option value="default">Default</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                        <option value="beds-asc">Bedrooms (Low to High)</option>
                        <option value="beds-desc">Bedrooms (High to Low)</option>
                    </select>
                </div>

                {/* Compare Button */}
                <div className="control-group compare-button-group">
                    <button
                        className="btn btn-secondary" // Or a distinct style
                        onClick={onOpenCompare}
                        disabled={!canCompare}
                        title={!canCompare ? `Select ${MAX_COMPARE_ITEMS === 3 ? '2 or 3' : `2 to ${MAX_COMPARE_ITEMS}`} properties to compare` : 'Compare selected properties'}
                    >
                        Compare ({comparisonList.length})
                    </button>
                </div>
            </div>

            {/* Property List */}
            <PropertyList
                properties={displayedProperties}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
                comparisonList={comparisonList} // Pass down comparison list
                onToggleComparison={onToggleComparison} // Pass down toggle function
            />
        </div>
    );
};

export default PropertiesPage;