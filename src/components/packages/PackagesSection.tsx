import { Check, Package, Star, Zap } from "lucide-react";
import React from "react";

import FrostedCard from "../ui/FrostedCard";
import CollapsibleSection from "../ui/CollapsibleSection";

interface PackageFeature {
  name: string;
  included: boolean;
}

interface ServicePackage {
  name: string;
  subtitle: string;
  price: string;
  priceDetail: string;
  icon: React.ReactNode;
  features: PackageFeature[];
  buttonText: string;
  buttonAction: string;
}

const PackagesSection: React.FC = () => {
  const packages: ServicePackage[] = [
    {
      name: "Basic",
      subtitle: "Perfect for small businesses and personal sites",
      price: "$3,500 CAD",
      priceDetail: "4-week turnaround",
      icon: <Package className="h-8 w-8 text-blue-500" />,
      features: [
        { name: "Up to 5 pages", included: true },
        { name: "Mobile responsive design", included: true },
        { name: "Contact forms", included: true },
        { name: "Google Maps & Reviews integration", included: true },
        { name: "1 year free hosting", included: true },
        { name: "3 rounds of revisions", included: true },
      ],
      buttonText: "Get Started",
      buttonAction: "contact",
    },
    {
      name: "Premium",
      subtitle: "Advanced features for growing businesses",
      price: "$5,000 CAD",
      priceDetail: "4-week turnaround",
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      features: [
        { name: "Everything in Basic, plus:", included: true },
        { name: "Up to 10 pages (vs 5)", included: true },
        { name: "5 rounds of revisions (vs 3)", included: true },
        { name: "Custom animations & interactions", included: true },
        { name: "Third-party integrations", included: true },
        { name: "Priority support (30 days)", included: true },
      ],
      buttonText: "Choose Premium",
      buttonAction: "contact",
    },
    {
      name: "Enterprise",
      subtitle: "Custom solutions for complex requirements",
      price: "Custom",
      priceDetail: "Tailored pricing",
      icon: <Zap className="h-8 w-8 text-purple-500" />,
      features: [
        { name: "Everything in Premium, plus:", included: true },
        { name: "Unlimited pages", included: true },
        { name: "Custom database solutions", included: true },
        { name: "Advanced backend development", included: true },
        { name: "API development & integrations", included: true },
        { name: "Custom cloud architecture", included: true },
        { name: "DevOps & CI/CD setup", included: true },
        { name: "24/7 priority support", included: true },
      ],
      buttonText: "Get in Touch",
      buttonAction: "contact",
    },
  ];

  const handlePackageAction = (action: string) => {
    if (action === "contact") {
      // Navigate to contact page or open contact form
      window.location.href = "/contact";
    }
  };

  return (
    <div className="relative">
      <section className="relative mx-auto w-full max-w-7xl p-3 px-2 pt-6 sm:p-4 sm:px-6 lg:px-8 lg:pt-8">
        {/* Header */}
        <div className="mb-8 text-center lg:mb-12">
          <h2 className="mb-4 animate-fade-up text-3xl font-bold leading-normal text-gray-900 lg:text-4xl dark:text-white">
            Service{" "}
            <span className="inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text leading-normal text-transparent dark:from-blue-400 dark:via-blue-500 dark:to-blue-600">
              Packages
            </span>
          </h2>
          <p className="mx-auto max-w-3xl animate-fade-up-200 text-lg text-gray-600 opacity-0 dark:text-gray-300">
            Choose the perfect package for your web development needs. All
            packages include modern, responsive design, professional deployment,
            and a 4-week turnaround time to get your business online quickly.
          </p>
        </div>

        {/* Mobile Layout - Collapsible */}
        <div className="lg:hidden">
          <CollapsibleSection title="Choose Your Package">
            <div className="mt-6 space-y-8">
              {packages.map((pkg, index) => (
                <div key={pkg.name}>
                  <FrostedCard
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                    className="animate-fade-up opacity-0"
                  >
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center">
                          {pkg.icon}
                          <h3 className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">
                            {pkg.name}
                          </h3>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {pkg.price}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {pkg.priceDetail}
                          </div>
                        </div>
                      </div>

                      <p className="mb-6 text-gray-600 dark:text-gray-300">
                        {pkg.subtitle}
                      </p>

                      <div className="mb-6 space-y-3">
                        {pkg.features.map((feature) => (
                          <div key={feature.name} className="flex items-center">
                            {feature.name.startsWith("Everything in") ? (
                              <>
                                <div className="flex h-5 w-5 items-center justify-center">
                                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                </div>
                                <span className="ml-3 font-medium text-blue-600 dark:text-blue-400">
                                  {feature.name}
                                </span>
                              </>
                            ) : (
                              <>
                                <Check
                                  className={`h-5 w-5 ${
                                    feature.included
                                      ? "text-green-500"
                                      : "text-gray-300 dark:text-gray-600"
                                  }`}
                                />
                                <span
                                  className={`ml-3 ${
                                    feature.included
                                      ? "text-gray-900 dark:text-white"
                                      : "text-gray-400 dark:text-gray-500"
                                  }`}
                                >
                                  {feature.name}
                                </span>
                              </>
                            )}
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => handlePackageAction(pkg.buttonAction)}
                        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                      >
                        {pkg.buttonText}
                      </button>
                    </div>
                  </FrostedCard>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        </div>

        {/* Desktop Layout - Grid */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {packages.map((pkg, index) => (
              <div key={pkg.name}>
                <FrostedCard
                  style={{
                    animationDelay: `${0.3 + index * 0.1}s`,
                  }}
                  className="h-full animate-fade-up opacity-0"
                >
                  <div className="flex h-full flex-col">
                    <div className="mb-4 flex items-center justify-center">
                      {pkg.icon}
                    </div>

                    <h3 className="mb-2 text-center text-2xl font-bold text-gray-900 dark:text-white">
                      {pkg.name}
                    </h3>

                    <p className="mb-6 text-center text-gray-600 dark:text-gray-300">
                      {pkg.subtitle}
                    </p>

                    <div className="mb-6 text-center">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {pkg.price}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {pkg.priceDetail}
                      </div>
                    </div>

                    <div className="mb-6 flex-1 space-y-3">
                      {pkg.features.map((feature) => (
                        <div key={feature.name} className="flex items-center">
                          {feature.name.startsWith("Everything in") ? (
                            <>
                              <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                              </div>
                              <span className="ml-3 text-sm font-medium text-blue-600 dark:text-blue-400">
                                {feature.name}
                              </span>
                            </>
                          ) : (
                            <>
                              <Check
                                className={`h-5 w-5 flex-shrink-0 ${
                                  feature.included
                                    ? "text-green-500"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                              <span
                                className={`ml-3 text-sm ${
                                  feature.included
                                    ? "text-gray-900 dark:text-white"
                                    : "text-gray-400 dark:text-gray-500"
                                }`}
                              >
                                {feature.name}
                              </span>
                            </>
                          )}
                        </div>
                      ))}
                    </div>

                                      <button
                    onClick={() => handlePackageAction(pkg.buttonAction)}
                    className="w-full rounded-lg px-6 py-3 font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    {pkg.buttonText}
                  </button>
                  </div>
                </FrostedCard>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <FrostedCard className="animate-fade-up-800 opacity-0">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              What's Included in All Packages
            </h3>
            <div className="grid grid-cols-1 gap-4 text-gray-600 md:grid-cols-2 lg:grid-cols-4 dark:text-gray-300">
              <div className="flex items-center justify-center">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Professional Design</span>
              </div>
              <div className="flex items-center justify-center">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Fast Loading Times</span>
              </div>
              <div className="flex items-center justify-center">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>SSL Certificate</span>
              </div>
              <div className="flex items-center justify-center">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Domain Setup Assistance</span>
              </div>
            </div>
          </FrostedCard>
        </div>
      </section>
    </div>
  );
};

export default PackagesSection;
