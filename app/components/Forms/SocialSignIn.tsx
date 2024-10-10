import React from "react";
import { account } from "../../lib/appwrite"; // Ensure this imports the Appwrite client
import { OAuthProvider } from "appwrite"; // Import OAuthProvider if not already done
import { FaGoogle, FaFacebook } from "react-icons/fa"; // Import Google and Facebook icons from react-icons

const socialOptions = [
  {
    name: "Google",
    icon: <FaGoogle className="w-6 h-6 mr-2" />, // Use react-icons for Google
    provider: OAuthProvider.Google, // Use OAuthProvider enum for type safety
  },
  {
    name: "Facebook",
    icon: <FaFacebook className="w-6 h-6 mr-2" />, // Use react-icons for Facebook
    provider: OAuthProvider.Facebook, // Use OAuthProvider enum for type safety
  },
];

const SocialSignIn: React.FC = () => {
  const handleSocialLogin = async (provider: OAuthProvider) => {
    try {
      // Get the OAuth2 session URL
      const url = await account.createOAuth2Session(
        provider,
        `${window.location.origin}/success`,
        `${window.location.origin}/failure`
      );

      // Ensure the URL is defined before redirecting
      if (url) {
        window.location.href = url; // Redirect user to the provider's login page
      }
    } catch (error) {
      console.error("Error during social login:", error);
      // Handle error (you may want to show a notification to the user)
    }
  };

  return (
    <div className="flex gap-6 items-start text-xs font-medium text-black">
      {socialOptions.map((option) => (
        <button
          key={option.name}
          className="flex-1 flex items-center justify-center px-5 py-1 rounded-xl border border-solid border-zinc-300"
          onClick={() => handleSocialLogin(option.provider)}
        >
          {option.icon} {/* Render the icon */}
          Sign in with {option.name}
        </button>
      ))}
    </div>
  );
};

export default SocialSignIn;
