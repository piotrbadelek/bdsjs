"use strict";

const ERRNO = new Map();

ERRNO.set(1, "EPERM - Operation not permitted");
ERRNO.set(2, "ENOENT - No such file or directory");
ERRNO.set(3, "ESRCH - No such process");
ERRNO.set(4, "EINTR - Interrupted system call");
ERRNO.set(5, "EIO - Input/output error");
ERRNO.set(6, "ENXIO - No such device or address");
ERRNO.set(7, "E2BIG - Argument list too long");
ERRNO.set(8, "ENOEXEC - Exec format error");
ERRNO.set(9, "EBADF - Bad file descriptor");
ERRNO.set(10, "ECHILD - No child processes");
ERRNO.set(11, "EAGAIN - Resource temporarily unavailable");
ERRNO.set(12, "ENOMEM - Cannot allocate memory");
ERRNO.set(13, "EACCES - Permission denied");
ERRNO.set(14, "EFAULT - Bad address");
ERRNO.set(15, "ENOTBLK - Block device required");
ERRNO.set(16, "EBUSY - Device or resource busy");
ERRNO.set(17, "EEXIST - File exists");
ERRNO.set(18, "EXDEV - Invalid cross-device link");
ERRNO.set(19, "ENODEV - No such device");
ERRNO.set(20, "ENOTDIR - Not a directory");
ERRNO.set(21, "EISDIR - Is a directory");
ERRNO.set(22, "EINVAL - Invalid argument");
ERRNO.set(23, "ENFILE - Too many open files in system");
ERRNO.set(24, "EMFILE - Too many open files");
ERRNO.set(25, "ENOTTY - Inappropriate ioctl for device");
ERRNO.set(26, "ETXTBSY - Text file busy");
ERRNO.set(27, "EFBIG - File too large");
ERRNO.set(28, "ENOSPC - No space left on device");
ERRNO.set(29, "ESPIPE - Illegal seek");
ERRNO.set(30, "EROFS - Read-only file system");
ERRNO.set(31, "EMLINK - Too many links");
ERRNO.set(32, "EPIPE - Broken pipe");
ERRNO.set(33, "EDOM - Numerical argument out of domain");
ERRNO.set(34, "ERANGE - Numerical result out of range");
ERRNO.set(35, "EDEADLK - Resource deadlock avoided");
ERRNO.set(36, "ENAMETOOLONG - File name too long");
ERRNO.set(37, "ENOLCK - No locks available");
ERRNO.set(38, "ENOSYS - Function not implemented");
ERRNO.set(39, "ENOTEMPTY - Directory not empty");
ERRNO.set(40, "ELOOP - Too many levels of symbolic links");
ERRNO.set(42, "ENOMSG - No message of desired type");
ERRNO.set(43, "EIDRM - Identifier removed");
ERRNO.set(44, "ECHRNG - Channel number out of range");
ERRNO.set(45, "EL2NSYNC - Level 2 not synchronized");
ERRNO.set(46, "EL3HLT - Level 3 halted");
ERRNO.set(47, "EL3RST - Level 3 reset");
ERRNO.set(48, "ELNRNG - Link number out of range");
ERRNO.set(49, "EUNATCH - Protocol driver not attached");
ERRNO.set(50, "ENOCSI - No CSI structure available");
ERRNO.set(51, "EL2HLT - Level 2 halted");
ERRNO.set(52, "EBADE - Invalid exchange");
ERRNO.set(53, "EBADR - Invalid request descriptor");
ERRNO.set(54, "EXFULL - Exchange full");
ERRNO.set(55, "ENOANO - No anode");
ERRNO.set(56, "EBADRQC - Invalid request code");
ERRNO.set(57, "EBADSLT - Invalid slot");
ERRNO.set(59, "EBFONT - Bad font file format");
ERRNO.set(60, "ENOSTR - Device not a stream");
ERRNO.set(61, "ENODATA - No data available");
ERRNO.set(62, "ETIME - Timer expired");
ERRNO.set(63, "ENOSR - Out of streams resources");
ERRNO.set(64, "ENONET - Machine is not on the network");
ERRNO.set(65, "ENOPKG - Package not installed");
ERRNO.set(66, "EREMOTE - Object is remote");
ERRNO.set(67, "ENOLINK - Link has been severed");
ERRNO.set(68, "EADV - Advertise error");
ERRNO.set(69, "ESRMNT - Srmount error");
ERRNO.set(70, "ECOMM - Communication error on send");
ERRNO.set(71, "EPROTO - Protocol error");
ERRNO.set(72, "EMULTIHOP - Multihop attempted");
ERRNO.set(73, "EDOTDOT - RFS specific error");
ERRNO.set(74, "EBADMSG - Bad message");
ERRNO.set(75, "EOVERFLOW - Value too large for defined data type");
ERRNO.set(76, "ENOTUNIQ - Name not unique on network");
ERRNO.set(77, "EBADFD - File descriptor in bad state");
ERRNO.set(78, "EREMCHG - Remote address changed");
ERRNO.set(79, "ELIBACC - Can not access a needed shared library");
ERRNO.set(80, "ELIBBAD - Accessing a corrupted shared library");
ERRNO.set(81, "ELIBSCN - .lib section in a.out corrupted");
ERRNO.set(82, "ELIBMAX - Attempting to link in too many shared libraries");
ERRNO.set(83, "ELIBEXEC - Cannot exec a shared library directly");
ERRNO.set(84, "EILSEQ - Invalid or incomplete multibyte or wide character");
ERRNO.set(85, "ERESTART - Interrupted system call should be restarted");
ERRNO.set(86, "ESTRPIPE - Streams pipe error");
ERRNO.set(87, "EUSERS - Too many users");
ERRNO.set(88, "ENOTSOCK - Socket operation on non-socket");
ERRNO.set(89, "EDESTADDRREQ - Destination address required");
ERRNO.set(90, "EMSGSIZE - Message too long");
ERRNO.set(91, "EPROTOTYPE - Protocol wrong type for socket");
ERRNO.set(92, "ENOPROTOOPT - Protocol not available");
ERRNO.set(93, "EPROTONOSUPPORT - Protocol not supported");
ERRNO.set(94, "ESOCKTNOSUPPORT - Socket type not supported");
ERRNO.set(95, "EOPNOTSUPP - Operation not supported");
ERRNO.set(96, "EPFNOSUPPORT - Protocol family not supported");
ERRNO.set(97, "EAFNOSUPPORT - Address family not supported by protocol");
ERRNO.set(98, "EADDRINUSE - Address already in use");
ERRNO.set(99, "EADDRNOTAVAIL - Cannot assign requested address");
ERRNO.set(100, "ENETDOWN - Network is down");
ERRNO.set(101, "ENETUNREACH - Network is unreachable");
ERRNO.set(102, "ENETRESET - Network dropped connection on reset");
ERRNO.set(103, "ECONNABORTED - Software caused connection abort");
ERRNO.set(104, "ECONNRESET - Connection reset by peer");
ERRNO.set(105, "ENOBUFS - No buffer space available");
ERRNO.set(106, "EISCONN - Transport endpoint is already connected");
ERRNO.set(107, "ENOTCONN - Transport endpoint is not connected");
ERRNO.set(108, "ESHUTDOWN - Cannot send after transport endpoint shutdown");
ERRNO.set(109, "ETOOMANYREFS - Too many references: cannot splice");
ERRNO.set(110, "ETIMEDOUT - Connection timed out");
ERRNO.set(111, "ECONNREFUSED - Connection refused");
ERRNO.set(112, "EHOSTDOWN - Host is down");
ERRNO.set(113, "EHOSTUNREACH - No route to host");
ERRNO.set(114, "EALREADY - Operation already in progress");
ERRNO.set(115, "EINPROGRESS - Operation now in progress");
ERRNO.set(116, "ESTALE - Stale file handle");
ERRNO.set(117, "EUCLEAN - Structure needs cleaning");
ERRNO.set(118, "ENOTNAM - Not a XENIX named type file");
ERRNO.set(119, "ENAVAIL - No XENIX semaphores available");
ERRNO.set(120, "EISNAM - Is a named type file");
ERRNO.set(121, "EREMOTEIO - Remote I/O error");
ERRNO.set(122, "EDQUOT - Disk quota exceeded");
ERRNO.set(123, "ENOMEDIUM - No medium found");
ERRNO.set(124, "EMEDIUMTYPE - Wrong medium type");
ERRNO.set(125, "ECANCELED - Operation canceled");
ERRNO.set(126, "ENOKEY - Required key not available");
ERRNO.set(127, "EKEYEXPIRED - Key has expired");
ERRNO.set(128, "EKEYREVOKED - Key has been revoked");
ERRNO.set(129, "EKEYREJECTED - Key was rejected by service");
ERRNO.set(130, "EOWNERDEAD - Owner died");
ERRNO.set(131, "ENOTRECOVERABLE - State not recoverable");
ERRNO.set(132, "ERFKILL - Operation not possible due to RF-kill");
ERRNO.set(133, "EHWPOISON - Memory page has hardware error");