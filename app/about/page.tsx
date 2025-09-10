import { MapPin, Phone, Clock, User } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">About AC BIG APPLE</h1>
          <p className="text-xl text-green-700 max-w-3xl mx-auto leading-relaxed">
            Your premier wholesale destination in Lagos for luxurious, quality beauty and spa essentials at unbeatable
            prices.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Business Description */}
          <div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-green-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-green-800">
              <p className="leading-relaxed">
                As a direct distributor for top Chinese beauty and cosmetics companies, we offer an extensive range of
                products far cheaper than competitors. Our vast inventory is conveniently sectioned into four main
                categories:
              </p>
              <div className="grid grid-cols-2 gap-4 my-6">
                <div className="bg-green-100/50 rounded-xl p-4 text-center">
                  <h3 className="font-semibold text-green-900">Nails & Accessories</h3>
                </div>
                <div className="bg-green-100/50 rounded-xl p-4 text-center">
                  <h3 className="font-semibold text-green-900">Pedicure & Manicure</h3>
                </div>
                <div className="bg-green-100/50 rounded-xl p-4 text-center">
                  <h3 className="font-semibold text-green-900">Beauty & Spa Products</h3>
                </div>
                <div className="bg-green-100/50 rounded-xl p-4 text-center">
                  <h3 className="font-semibold text-green-900">Salon Equipment</h3>
                </div>
              </div>
              <p className="leading-relaxed">
                If it's in these categories, we have it at the most competitive wholesale rates. Partner with AC BIG
                APPLE for unparalleled affordability and a comprehensive selection for your business needs.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-green-900 mb-6">Visit Our Store</h2>
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="bg-green-100 rounded-full p-3">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Address</h3>
                  <p className="text-green-800">
                    10 Bankole Street, Balogun Market
                    <br />
                    Lagos Island, Lagos Nigeria
                  </p>
                  <a
                    href="https://maps.app.goo.gl/oVJDTv9h37BJ6JJN8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-green-600 hover:text-green-700 font-medium underline"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-4">
                <div className="bg-green-100 rounded-full p-3">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Contact</h3>
                  <a href="tel:08066537368" className="text-green-800 hover:text-green-600 font-medium">
                    08066537368
                  </a>
                </div>
              </div>

              {/* Contact Person */}
              <div className="flex items-start gap-4">
                <div className="bg-green-100 rounded-full p-3">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Contact Person</h3>
                  <p className="text-green-800">Queen Ben</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="bg-green-100 rounded-full p-3">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Operating Hours</h3>
                  <p className="text-green-800">
                    Monday - Saturday
                    <br />
                    8:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-green-900 mb-6 text-center">Find Us</h2>
          <div className="aspect-video rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7234567890123!2d3.3947!3d6.4531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjcnMTEuMiJOIDPCsDIzJzQxLjAiRQ!5e0!3m2!1sen!2sng!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
            />
          </div>
          <div className="text-center mt-4">
            <a
              href="https://maps.app.goo.gl/oVJDTv9h37BJ6JJN8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              <MapPin className="w-5 h-5" />
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
