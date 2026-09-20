import React, { useEffect, useRef } from "react";

import {
  Animated,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type ConfirmModalProps = {
  visible: boolean;

  title?: string;

  message?: string;

  confirmText?: string;

  cancelText?: string;

  onConfirm: () => void;

  onCancel: () => void;

  loading?: boolean;

  danger?: boolean;

  icon?: string;
};

export default function ConfirmModal({
  visible,

  title = "Konfirmasi",

  message = "Apakah Anda yakin ingin melanjutkan?",

  confirmText = "Lanjutkan",

  cancelText = "Batal",

  onConfirm,

  onCancel,

  loading = false,

  danger = false,

  icon = "✓",
}: ConfirmModalProps) {
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const scale = useRef(new Animated.Value(0.92)).current;

  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (visible) {
      overlayOpacity.setValue(0);

      scale.setValue(0.92);

      translateY.setValue(20);

      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,

          duration: 180,

          easing: Easing.out(Easing.cubic),

          useNativeDriver: true,
        }),

        Animated.spring(scale, {
          toValue: 1,

          friction: 8,

          tension: 80,

          useNativeDriver: true,
        }),

        Animated.timing(translateY, {
          toValue: 0,

          duration: 220,

          easing: Easing.out(Easing.cubic),

          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, overlayOpacity, scale, translateY]);

  const handleCancel = () => {
    if (loading) {
      return;
    }

    onCancel();
  };

  const handleConfirm = () => {
    if (loading) {
      return;
    }

    onConfirm();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleCancel}
    >
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.overlay,

            {
              opacity: overlayOpacity,
            },
          ]}
        />

        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={handleCancel}
          disabled={loading}
        />

        <Animated.View
          style={[
            styles.card,

            {
              opacity: overlayOpacity,

              transform: [
                {
                  scale,
                },

                {
                  translateY,
                },
              ],
            },
          ]}
        >
          {/* ---------------------------------------------------------- */}
          {/* Icon                                                       */}
          {/* ---------------------------------------------------------- */}

          <View
            style={[styles.iconContainer, danger && styles.iconContainerDanger]}
          >
            <Text style={[styles.icon, danger && styles.iconDanger]}>
              {icon}
            </Text>
          </View>

          {/* ---------------------------------------------------------- */}
          {/* Title                                                      */}
          {/* ---------------------------------------------------------- */}

          <Text style={styles.title}>{title}</Text>

          {/* ---------------------------------------------------------- */}
          {/* Message                                                    */}
          {/* ---------------------------------------------------------- */}

          <Text style={styles.message}>{message}</Text>

          {/* ---------------------------------------------------------- */}
          {/* Buttons                                                    */}
          {/* ---------------------------------------------------------- */}

          <View style={styles.buttons}>
            {/* Batal */}

            <Pressable
              onPress={handleCancel}
              disabled={loading}
              style={({ pressed }) => [
                styles.cancelButton,

                pressed && styles.buttonPressed,

                loading && styles.buttonDisabled,
              ]}
            >
              <Text style={styles.cancelText}>{cancelText}</Text>
            </Pressable>

            {/* Confirm */}

            <Pressable
              onPress={handleConfirm}
              disabled={loading}
              style={({ pressed }) => [
                styles.confirmButton,

                danger && styles.confirmButtonDanger,

                pressed && styles.buttonPressed,

                loading && styles.buttonDisabled,
              ]}
            >
              {loading ? (
                <Text style={styles.confirmText}>Memproses...</Text>
              ) : (
                <Text style={styles.confirmText}>{confirmText}</Text>
              )}
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

/*
|--------------------------------------------------------------------------
| Styles
|--------------------------------------------------------------------------
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    paddingHorizontal: 24,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: "rgba(15, 23, 42, 0.58)",
  },

  card: {
    width: "100%",

    maxWidth: 420,

    backgroundColor: "#FFFFFF",

    borderRadius: 26,

    paddingTop: 28,

    paddingHorizontal: 24,

    paddingBottom: 22,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,

      height: 12,
    },

    shadowOpacity: 0.18,

    shadowRadius: 24,

    elevation: 12,
  },

  iconContainer: {
    width: 64,

    height: 64,

    borderRadius: 32,

    alignSelf: "center",

    alignItems: "center",

    justifyContent: "center",

    backgroundColor: "#ECFDF5",

    marginBottom: 18,
  },

  iconContainerDanger: {
    backgroundColor: "#FEF2F2",
  },

  icon: {
    fontSize: 28,

    fontWeight: "700",

    color: "#16A34A",
  },

  iconDanger: {
    color: "#DC2626",
  },

  title: {
    fontSize: 23,

    lineHeight: 30,

    fontWeight: "700",

    color: "#111827",

    textAlign: "center",

    marginBottom: 10,
  },

  message: {
    fontSize: 15,

    lineHeight: 23,

    color: "#6B7280",

    textAlign: "center",

    paddingHorizontal: 4,

    marginBottom: 26,
  },

  buttons: {
    flexDirection: "row",

    gap: 12,
  },

  cancelButton: {
    flex: 1,

    minHeight: 52,

    borderRadius: 16,

    alignItems: "center",

    justifyContent: "center",

    backgroundColor: "#F3F4F6",

    borderWidth: 1,

    borderColor: "#E5E7EB",
  },

  confirmButton: {
    flex: 1,

    minHeight: 52,

    borderRadius: 16,

    alignItems: "center",

    justifyContent: "center",

    backgroundColor: "#65A30D",

    shadowColor: "#65A30D",

    shadowOffset: {
      width: 0,

      height: 5,
    },

    shadowOpacity: 0.22,

    shadowRadius: 8,

    elevation: 4,
  },

  confirmButtonDanger: {
    backgroundColor: "#DC2626",

    shadowColor: "#DC2626",
  },

  cancelText: {
    fontSize: 15,

    fontWeight: "600",

    color: "#374151",
  },

  confirmText: {
    fontSize: 15,

    fontWeight: "700",

    color: "#FFFFFF",
  },

  buttonPressed: {
    opacity: 0.78,

    transform: [
      {
        scale: 0.98,
      },
    ],
  },

  buttonDisabled: {
    opacity: 0.55,
  },
});
