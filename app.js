// Main application logic

function searchPhone() {
    const phoneInput = document.getElementById('phoneInput').value.trim();
    const errorElement = document.getElementById('error');
    const resultsElement = document.getElementById('results');
    const loadingElement = document.getElementById('loading');
    
    // Clear previous results
    errorElement.classList.remove('show');
    resultsElement.classList.remove('show');
    loadingElement.classList.add('show');
    
    // Validate input
    if (!phoneInput) {
        showError('Please enter a phone number');
        loadingElement.classList.remove('show');
        return;
    }
    
    // Simulate processing delay
    setTimeout(() => {
        processPhoneNumber(phoneInput, errorElement, resultsElement, loadingElement);
    }, 800);
}

function processPhoneNumber(phoneInput, errorElement, resultsElement, loadingElement) {
    loadingElement.classList.remove('show');
    
    // Normalize phone number
    let phone = phoneInput.replace(/\s/g, '');
    
    // Add + if not present
    if (!phone.startsWith('+') && !phone.startsWith('00')) {
        phone = '+' + phone;
    }
    
    // Handle 00 prefix (common in many countries)
    if (phone.startsWith('00')) {
        phone = '+' + phone.substring(2);
    }
    
    // Remove common formatting
    phone = phone.replace(/[-().\s]/g, '');
    
    // Validate
    if (!validatePhoneNumber(phone)) {
        showError('Invalid phone number format. Please ensure it has 10-15 digits.');
        return;
    }
    
    // Get country details
    const countryDetails = getCountryDetails(phone);
    
    if (!countryDetails) {
        showError('Country not in database. We support major countries including USA, Canada, UK, India, Japan, China, France, Germany, Italy, Spain, Australia, New Zealand, and South Africa.');
        return;
    }
    
    // Identify carrier
    const carrier = identifyCarrier(phone, countryDetails);
    
    // Get phone type
    const phoneType = getPhoneType(phone);
    
    // Get possible formats
    const formats = getPossibleFormats(phone);
    
    // Get region info
    const region = getRegion(phone, countryDetails);
    
    // Display results
    document.getElementById('flag').textContent = countryDetails.flag;
    document.getElementById('countryName').textContent = countryDetails.country;
    document.getElementById('countryCode').textContent = countryDetails.countryCode;
    document.getElementById('phoneValue').textContent = phone;
    document.getElementById('numberType').textContent = phoneType;
    document.getElementById('region').textContent = region;
    document.getElementById('carrier').textContent = carrier;
    document.getElementById('isValid').innerHTML = '<span style="color: #4caf50; font-weight: bold;">✓ Valid Format</span>';
    document.getElementById('formats').innerHTML = formats;
    document.getElementById('timezone').textContent = countryDetails.timezone;
    
    resultsElement.classList.add('show');
}

function getRegion(phone, countryDetails) {
    if (countryDetails.countryCode === '+1') {
        const areaCode = phone.substring(2, 5);
        const areaCodeToRegion = {
            '201': 'New Jersey',
            '202': 'Washington DC',
            '203': 'Connecticut',
            '204': 'Manitoba, Canada',
            '205': 'Alabama',
            '206': 'Washington',
            '207': 'Maine',
            '208': 'Idaho',
            '209': 'Central California',
            '210': 'San Antonio, Texas',
            '212': 'Manhattan, New York',
            '213': 'Los Angeles, California',
            '214': 'Dallas, Texas',
            '215': 'Philadelphia, Pennsylvania',
            '301': 'Maryland',
            '302': 'Delaware',
            '303': 'Denver, Colorado',
            '304': 'West Virginia',
            '305': 'Miami, Florida',
            '310': 'Los Angeles, California',
            '312': 'Chicago, Illinois',
            '313': 'Detroit, Michigan',
            '314': 'St. Louis, Missouri',
            '315': 'Syracuse, New York',
            '323': 'Los Angeles, California',
            '404': 'Atlanta, Georgia',
            '407': 'Orlando, Florida',
            '408': 'San Jose, California',
            '410': 'Baltimore, Maryland',
            '412': 'Pittsburgh, Pennsylvania',
            '415': 'San Francisco, California',
            '503': 'Portland, Oregon',
            '504': 'New Orleans, Louisiana',
            '510': 'Oakland, California',
            '512': 'Austin, Texas',
            '515': 'Des Moines, Iowa',
            '516': 'Long Island, New York',
            '520': 'Tucson, Arizona',
            '602': 'Phoenix, Arizona',
            '603': 'New Hampshire',
            '610': 'Philadelphia Area, Pennsylvania',
            '612': 'Minneapolis, Minnesota',
            '614': 'Columbus, Ohio',
            '615': 'Nashville, Tennessee',
            '617': 'Boston, Massachusetts',
            '619': 'San Diego, California',
            '703': 'Northern Virginia',
            '704': 'Charlotte, North Carolina',
            '707': 'Northern California',
            '708': 'Chicago Area, Illinois',
            '713': 'Houston, Texas',
            '714': 'Orange County, California',
            '718': 'New York Area, New York',
            '720': 'Denver, Colorado',
            '734': 'Ann Arbor, Michigan',
            '757': 'Hampton Roads, Virginia',
            '760': 'San Diego Area, California',
            '773': 'Chicago, Illinois',
            '775': 'Reno, Nevada',
            '801': 'Salt Lake City, Utah',
            '804': 'Richmond, Virginia',
            '805': 'Central Coast, California',
            '808': 'Hawaii',
            '815': 'Northern Illinois',
            '818': 'Los Angeles Area, California',
            '828': 'Western North Carolina',
            '831': 'Santa Cruz, California',
            '832': 'Houston Area, Texas',
            '858': 'San Diego, California',
            '860': 'Connecticut',
            '863': 'Central Florida',
            '864': 'Greenville, South Carolina',
            '901': 'Memphis, Tennessee',
            '903': 'Tyler, Texas',
            '907': 'Alaska',
            '908': 'New Jersey',
            '909': 'Inland Empire, California',
            '912': 'Savannah, Georgia',
            '913': 'Kansas City, Kansas',
            '914': 'New York Area, New York',
            '915': 'El Paso, Texas',
            '916': 'Sacramento, California',
            '917': 'New York Area, New York',
            '918': 'Tulsa, Oklahoma',
            '919': 'Raleigh, North Carolina',
            '925': 'Walnut Creek, California',
            '954': 'Fort Lauderdale, Florida',
            '972': 'Dallas Area, Texas',
            '973': 'Newark, New Jersey',
            '978': 'Northern Massachusetts'
        };
        return areaCodeToRegion[areaCode] || 'Unknown Region';
    } else if (countryDetails.countryCode === '+44') {
        return 'United Kingdom';
    } else if (countryDetails.countryCode === '+91') {
        const areaCode = phone.substring(2, 5);
        const areaCodeToRegion = {
            '11': 'Delhi',
            '20': 'Mumbai',
            '22': 'Mumbai Area',
            '24': 'Surat',
            '26': 'Vapi',
            '33': 'Kolkata',
            '40': 'Hyderabad',
            '44': 'Chennai',
            '79': 'Ahmedabad'
        };
        return areaCodeToRegion[areaCode] || 'India (Landline/Mobile)';
    } else if (countryDetails.countryCode === '+81') {
        return 'Japan';
    } else if (countryDetails.countryCode === '+86') {
        return 'China';
    } else if (countryDetails.countryCode === '+33') {
        return 'France';
    } else if (countryDetails.countryCode === '+49') {
        return 'Germany';
    } else if (countryDetails.countryCode === '+39') {
        return 'Italy';
    } else if (countryDetails.countryCode === '+34') {
        return 'Spain';
    } else if (countryDetails.countryCode === '+61') {
        return 'Australia';
    } else if (countryDetails.countryCode === '+64') {
        return 'New Zealand';
    } else if (countryDetails.countryCode === '+27') {
        return 'South Africa';
    }
    
    return 'Unknown Region';
}

function showError(message) {
    const errorElement = document.getElementById('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = '✓ Copied!';
        
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    }).catch(() => {
        alert('Failed to copy');
    });
}

// Allow Enter key to search
document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phoneInput');
    phoneInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchPhone();
        }
    });
    
    // Focus on input on page load
    phoneInput.focus();
});
