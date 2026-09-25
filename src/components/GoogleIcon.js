export default function RegisterScreen({ navigation }) {
    return (
        <>
            <TouchableOpacity style={styles.googleButton} activeOpacity={0.85}>
                <Image
                    source={require('@assets/google-icon.png')}
                    style={styles.googleIcon}
                    resizeMode="contain"
                />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>


            {/* Google Button */}
            <TouchableOpacity style={styles.googleButton} activeOpacity={0.85} disabled={loading}>
                <Image
                    source={require('@assets/google-icon.png')}
                    style={styles.googleIcon}
                    resizeMode="contain"
                />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>
        </>
    )
};



